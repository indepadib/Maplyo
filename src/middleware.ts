import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getCurrencyByCountry, PRICING_BY_CURRENCY, CurrencyCode } from "@/lib/pricing/currencies";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const debugCurrency = request.nextUrl.searchParams.get('debug_currency') as CurrencyCode | null;
    if (debugCurrency && PRICING_BY_CURRENCY[debugCurrency]) {
        response.cookies.set('maplyo-currency', debugCurrency);
        // Ensure downstream checks see it too for this request run
        request.cookies.set('maplyo-currency', debugCurrency);
    }

    // --- LANGUAGE DETECTION ---
    // If user hasn't manually selected a language (cookie), try to detect via Geo or Headers
    const hasLangCookie = request.cookies.get('maplyo-lang');
    // We also want to detect currency at the same time if not set
    const hasCurrencyCookie = request.cookies.get('maplyo-currency');
    
    if (!hasLangCookie || !hasCurrencyCookie) {
        // Netlify / Vercel provide geo info in request.geo
        // @ts-ignore
        const country = (request.geo?.country || request.headers.get('x-vercel-ip-country') || request.headers.get('x-country') || '').toLowerCase();

        let detectedLang = 'en';
        const c = country || '';
        
        const frCountries = ['fr', 'be', 'ch', 'sn', 'ci', 'cm', 'mg'];
        const esCountries = ['es', 'mx', 'ar', 'co', 'pe', 'cl', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'gq'];
        const arCountries = ['ma', 'dz', 'tn', 'eg', 'sa', 'ae', 'qa', 'kw', 'om', 'bh', 'lb', 'jo', 'iq', 'sy', 'ye', 'ly', 'sd'];

        if (frCountries.includes(c)) detectedLang = 'fr';
        else if (esCountries.includes(c)) detectedLang = 'es';
        else if (arCountries.includes(c)) detectedLang = 'ar';
        else {
            // Fallback to Accept-Language header
            const acceptLang = request.headers.get('accept-language')?.toLowerCase() || '';
            if (acceptLang.includes('fr')) detectedLang = 'fr';
            else if (acceptLang.includes('es')) detectedLang = 'es';
            else if (acceptLang.includes('ar')) detectedLang = 'ar';
        }

        if (!hasLangCookie) {
            response.cookies.set('maplyo-lang', detectedLang);
        }

        if (!hasCurrencyCookie) {
            const currency = getCurrencyByCountry(c);
            response.cookies.set('maplyo-currency', currency);
        }
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
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
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
