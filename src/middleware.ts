
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware disabled for now to rely on client-side Supabase Auth in AuthProvider
// Real production apps should use @supabase/ssr for server-side middleware protection.
export function middleware(request: NextRequest) {
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/dashboard/:path*',
        '/app/guides/:path*'
    ],
}
