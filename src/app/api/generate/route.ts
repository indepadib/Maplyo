import { NextRequest, NextResponse } from "next/server";
import { generateGuide, GuidePrompt } from "@/lib/ai/guide-generator";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const prompt: GuidePrompt = body.prompt;

        if (!prompt || (!prompt.city && !prompt.airbnbUrl && !prompt.propertyUrl)) {
            return NextResponse.json({ error: "City or property source is required" }, { status: 400 });
        }

        if ((prompt.airbnbUrl || prompt.propertyUrl) && !prompt.sourceOwnerConfirmed) {
            return NextResponse.json({
                error: "Listing authorization confirmation required",
                message: "Confirm that you own, manage, or are authorized to use the property information before importing it."
            }, { status: 400 });
        }

        // Generation consumes paid AI resources: require a valid Maplyo session.
        const authHeader = request.headers.get("Authorization");
        if (!authHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: authHeader } } }
        );

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Enforce guide limits server-side.
        const { data: profile } = await supabase
            .from("profiles")
            .select("plan_variant, subscription_status, trial_ends_at, extra_guides")
            .eq("id", user.id)
            .single();

        const { count } = await supabase
            .from("guides")
            .select("*", { count: 'exact', head: true })
            .eq("user_id", user.id);

        const trialEndsAt = profile?.trial_ends_at ? new Date(profile.trial_ends_at).getTime() : 0;
        const reverseTrialActive =
            profile?.plan_variant !== "pro" &&
            profile?.subscription_status !== "active" &&
            trialEndsAt > Date.now();

        const effectivePro = profile?.plan_variant === "pro" || reverseTrialActive;
        const baseLimit = effectivePro ? 2 : 1;
        const extra = Number(profile?.extra_guides || 0);
        const guideLimit = baseLimit + extra;

        if ((count || 0) >= guideLimit) {
            return NextResponse.json({
                error: "Limit reached",
                isLimitReached: true,
                effectivePlan: effectivePro ? "pro" : "free",
                trialActive: reverseTrialActive,
                message: effectivePro
                    ? "Your current Pro access includes 2 guides. Upgrade your portfolio capacity to create more."
                    : "Your Free plan includes 1 published guide. Upgrade to Pro to create more."
            }, { status: 403 });
        }

        const guide = await generateGuide(prompt);

        return NextResponse.json({ guide });
    } catch (error) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate guide" }, { status: 500 });
    }
}
