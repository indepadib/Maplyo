import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // --- LANGUAGE DETECTION ---
    // If user hasn't manually selected a language (cookie), try to detect via Geo or Headers
    const hasLangCookie = request.cookies.get('maplyo-lang');
    if (!hasLangCookie) {
        // Netlify / Vercel provide geo info in request.geo
        // @ts-ignore
        const country = (request.geo?.country || request.headers.get('x-vercel-ip-country') || request.headers.get('x-country') || '').toLowerCase();

        // Simple logic: if FR/BE/CH/MA -> 'fr', else -> 'en'
        // This is a heuristic.
        let detectedLang = 'en';
        if (['fr', 'be', 'ch', 'ma', 'sn', 'ci'].includes(country || '')) {
            detectedLang = 'fr';
        } else {
            // Fallback to Accept-Language header
            const acceptLang = request.headers.get('accept-language')?.toLowerCase() || '';
            if (acceptLang.includes('fr')) {
                detectedLang = 'fr';
            }
        }

        // Set the cookie for future client-side use
        response.cookies.set('maplyo-lang', detectedLang);
    }

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    await supabase.auth.getUser();

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - api (API routes - optional, but generally good to exclude unless protected)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
