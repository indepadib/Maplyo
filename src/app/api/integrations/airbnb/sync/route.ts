import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parseAirbnbCalendar } from "@/lib/integrations/ical";

export async function POST(request: Request) {
    const cookieStore = cookies();
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

        // 1. Find the iCal integration for this guide
        const { data: integration, error: intError } = await supabase
            .from('guide_integrations')
            .select('*, integrations(*)')
            .eq('guide_id', guideId)
            .eq('integrations.type', 'airbnb_ical')
            .single();

        if (intError || !integration) {
            return NextResponse.json({ error: "No Airbnb iCal integration found for this guide" }, { status: 404 });
        }

        const icalUrl = integration.integrations.credentials.icalUrl;
        if (!icalUrl) {
            return NextResponse.json({ error: "iCal URL not configured" }, { status: 400 });
        }

        // 2. Parse the calendar
        const bookings = await parseAirbnbCalendar(icalUrl);

        // 3. Sync to access_codes table
        const upsertData = bookings.map(booking => ({
            guide_id: guideId,
            guest_name: booking.guestName,
            valid_from: booking.start.toISOString(),
            valid_until: booking.end.toISOString(),
            source: 'airbnb',
            external_uid: booking.uid,
            status: 'active'
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
            message: `Successfully synced ${bookings.length} bookings.` 
        });

    } catch (error: any) {
        console.error('[Sync] Error:', error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
