export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from "next/server";
import { parseAirbnbCalendar } from "@/lib/integrations/ical";

export async function POST(request: Request) {
    const { createServerClient } = await import("@supabase/ssr");
    const { cookies } = await import("next/headers");
    
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { guideId } = await request.json();
        if (!guideId) {
            return NextResponse.json({ error: "Guide ID is required" }, { status: 400 });
        }

        // 1. Find the configuration for this guide
        const { data: configData, error: configError } = await supabase
            .from('guide_integrations')
            .select('config')
            .eq('guide_id', guideId)
            .single();

        if (configError || !configData?.config) {
            return NextResponse.json({ error: "Configuration not found for this guide. Please set it up in the builder." }, { status: 404 });
        }

        const config = configData.config as any;
        const icalUrl = config.icalUrl;
        
        if (!icalUrl) {
            return NextResponse.json({ error: "Airbnb iCal URL not configured for this guide." }, { status: 400 });
        }

        // 2. Parse the calendar
        const bookings = await parseAirbnbCalendar(icalUrl);

        // 3. Get User's Global Tuya Credentials
        const { data: tuyaInt } = await supabase
            .from('integrations')
            .select('credentials')
            .eq('user_id', user.id)
            .eq('type', 'tuya')
            .single();

        const tuyaCreds = tuyaInt?.credentials;
        const tuyaDeviceId = config.tuyaDeviceId;

        // 4. Sync to access_codes table
        const upsertData = await Promise.all(bookings.map(async booking => {
            let generatedCode = null;

            // Generate Tuya code if device ID and credentials exist
            if (tuyaDeviceId && tuyaCreds?.accessId && tuyaCreds?.accessSecret) {
                // In a real scenario, we'd call the Tuya API here
                // For now, we generate a 6-digit code (simulating the integration)
                generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
            }

            return {
                guide_id: guideId,
                guest_name: booking.guestName,
                valid_from: booking.start.toISOString(),
                valid_until: booking.end.toISOString(),
                source: 'airbnb',
                external_uid: booking.uid,
                code: generatedCode, // Store the generated lock code
                status: 'active'
            };
        }));

        const { error: upsertError } = await supabase
            .from('access_codes')
            .upsert(upsertData, { onConflict: 'guide_id,external_uid' });

        if (upsertError) {
            console.error('[Sync] Upsert error:', upsertError);
            return NextResponse.json({ error: "Failed to sync bookings to database" }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            count: bookings.length,
            message: `Successfully synced ${bookings.length} bookings for guide ${guideId}.` 
        });

    } catch (error: any) {
        console.error('[Sync] Error:', error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
