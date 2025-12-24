import { NextRequest, NextResponse } from "next/server";
import { generateGuide, GuidePrompt } from "@/lib/ai/guide-generator";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const prompt: GuidePrompt = body.prompt;

        if (!prompt || !prompt.city) {
            return NextResponse.json({ error: "City is required" }, { status: 400 });
        }

        // Validate User & Check Limits
        const authHeader = request.headers.get("Authorization");
        if (authHeader) {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                { global: { headers: { Authorization: authHeader } } }
            );
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Check Profile Plan
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("plan_variant")
                    .eq("id", user.id)
                    .single();

                // Check Guide Count
                const { count } = await supabase
                    .from("guides")
                    .select("*", { count: 'exact', head: true })
                    .eq("user_id", user.id);

                const isPro = profile?.plan_variant === "pro";
                const guideLimit = isPro ? Infinity : 1;

                if ((count || 0) >= guideLimit) {
                    return NextResponse.json({
                        error: "Limit reached",
                        isLimitReached: true,
                        message: "Upgrade to Pro to create more guides."
                    }, { status: 403 });
                }
            }
        }

        const guide = await generateGuide(prompt);

        return NextResponse.json({ guide });
    } catch (error) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate guide" }, { status: 500 });
    }
}
