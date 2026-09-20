import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Lazy initialization for build resilience
const getSupabaseAdmin = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
        process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key"
    );
};

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const { guideId } = body;

        if (!guideId) {
            return NextResponse.json({ error: "Guide ID required" }, { status: 400 });
        }

        const supabase = getSupabaseAdmin();

        // Extract user agent if needed
        const userAgent = req.headers.get("user-agent") || "unknown";

        // Insert view record
        const { error } = await supabase
            .from("guide_views")
            .insert({
                guide_id: guideId,
                user_agent: userAgent
            });

        if (error) {
            console.error("Analytics track error:", error);
            // Non-fatal, just return ok to not break client
            return NextResponse.json({ success: false });
        }

        // Activation milestone: mark the first real guest session once per guide.
        // This fails open while the product_events migration is rolling out.
        try {
            const { data: guide } = await supabase
                .from("guides")
                .select("user_id")
                .eq("id", guideId)
                .maybeSingle();

            if (guide?.user_id) {
                const existing = await supabase
                    .from("product_events")
                    .select("id")
                    .eq("user_id", guide.user_id)
                    .eq("guide_id", guideId)
                    .eq("event_name", "first_guest_session")
                    .limit(1);

                if (!existing.error && (!existing.data || existing.data.length === 0)) {
                    await supabase.from("product_events").insert([{
                        user_id: guide.user_id,
                        guide_id: guideId,
                        event_name: "first_guest_session",
                        metadata: { source: "public_guide_view" }
                    }]);
                }
            }
        } catch {
            // Never block guide analytics or the guest experience.
        }

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error("Analytics Error:", err);
        return NextResponse.json({ success: false });
    }
}
