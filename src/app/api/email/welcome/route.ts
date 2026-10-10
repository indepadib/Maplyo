import { sendWelcomeEmail } from "@/lib/email";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const BodySchema = z.object({
    name: z.string().max(120).optional(),
});

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !anonKey) return NextResponse.json({ error: "Auth unavailable" }, { status: 503 });

        const supabase = createClient(url, anonKey, {
            global: { headers: { Authorization: authHeader } },
            auth: { persistSession: false },
        });

        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const parsed = BodySchema.safeParse(await req.json().catch(() => ({})));
        if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

        const result = await sendWelcomeEmail(user.email, parsed.data.name || "there");
        return NextResponse.json(result, { status: result.success ? 200 : 503 });
    } catch {
        return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }
}
