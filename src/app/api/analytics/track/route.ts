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

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error("Analytics Error:", err);
        return NextResponse.json({ success: false });
    }
}
