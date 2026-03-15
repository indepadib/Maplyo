import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                },
            },
        }
    );

    // 1. Sign out on the server
    await supabase.auth.signOut();

    // 2. Explicitly clear Supabase session cookies as a backup
    // This is the "Nuclear" part to ensure middleware definitely sees the null session
    const response = NextResponse.redirect(new URL("/login", request.url));
    
    // Attempt to clear common supabase cookie names just in case
    const cookieNames = cookieStore.getAll().map(c => c.name);
    cookieNames.forEach(name => {
        if (name.includes('supabase') || name.includes('sb-')) {
            response.cookies.delete(name);
        }
    });

    return response;
}
