import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://leiaiothqandpyebrauv.supabase.co";
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaWFpb3RocWFuZHB5ZWJyYXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTM2NjEsImV4cCI6MjA4MjA4OTY2MX0.IuJ2uwwl6-ZvgnPy41rJfgY_YHbvUW7fmpzR7Sz7yKU";

        const supabase = createServerClient(
            supabaseUrl,
            supabaseKey,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options })
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.set({ name, value: '', ...options })
                    },
                },
            }
        );

        await supabase.auth.exchangeCodeForSession(code);
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(new URL("/onboarding", request.url));
}
