import { sendWelcomeEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, name } = await req.json();

        if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

        const result = await sendWelcomeEmail(email, name || "New User");

        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }
}
