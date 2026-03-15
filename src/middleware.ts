import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getCurrencyByCountry, PRICING_BY_CURRENCY, CurrencyCode } from "@/lib/pricing/currencies";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
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

    // 1. Check for user session early
    const { data: { user } } = await supabase.auth.getUser();

    // 2. Server-side redirect for protected routes
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || 
                           request.nextUrl.pathname.startsWith('/app/guides');
    
    if (!user && isProtectedRoute) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        // Preserve the original destination
        url.searchParams.set('next', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    // 3. Optional: Redirect authenticated users away from auth pages
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                      request.nextUrl.pathname.startsWith('/signup');
    if (user && isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 4. Handle Debug Currency Logic
    const debugCurrency = request.nextUrl.searchParams.get('debug_currency') as CurrencyCode | null;
    if (debugCurrency && PRICING_BY_CURRENCY[debugCurrency]) {
        response.cookies.set('maplyo-currency', debugCurrency);
        request.cookies.set('maplyo-currency', debugCurrency);
    }

    // 5. Language and Currency Detection
    const hasLangCookie = request.cookies.get('maplyo-lang');
    const hasCurrencyCookie = request.cookies.get('maplyo-currency');
    
    if (!hasLangCookie || !hasCurrencyCookie) {
        // @ts-ignore
        const country = (request.geo?.country || request.headers.get('x-vercel-ip-country') || request.headers.get('x-country') || '').toLowerCase();
        const c = country || '';
        
        if (!hasLangCookie) {
            let detectedLang = 'en';
            const frCountries = ['fr', 'be', 'ch', 'sn', 'ci', 'cm', 'mg'];
            const esCountries = ['es', 'mx', 'ar', 'co', 'pe', 'cl', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'gq'];
            const arCountries = ['ma', 'dz', 'tn', 'eg', 'sa', 'ae', 'qa', 'kw', 'om', 'bh', 'lb', 'jo', 'iq', 'sy', 'ye', 'ly', 'sd'];

            if (frCountries.includes(c) || c === 'ma') detectedLang = 'fr';
            else if (esCountries.includes(c)) detectedLang = 'es';
            else if (arCountries.includes(c)) detectedLang = 'ar';
            else {
                const acceptLang = request.headers.get('accept-language')?.toLowerCase() || '';
                if (acceptLang.includes('fr')) detectedLang = 'fr';
                else if (acceptLang.includes('es')) detectedLang = 'es';
                else if (acceptLang.includes('ar')) detectedLang = 'ar';
            }
            response.cookies.set('maplyo-lang', detectedLang);
        }

        if (!hasCurrencyCookie) {
            const currency = getCurrencyByCountry(c);
            response.cookies.set('maplyo-currency', currency);
        }
    }

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
