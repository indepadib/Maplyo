/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // node-ical pulls recurrence/Temporal code that must stay in the Node runtime.
    // Keeping it external prevents webpack/Turbopack from re-bundling JSBI/Temporal internals.
    serverExternalPackages: ['node-ical'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            },
            {
                protocol: 'https',
                hostname: '*.freepik.com',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
            },
            {
                protocol: 'https',
                hostname: 'api.qrserver.com',
            },
        ],
    },
};
export default nextConfig;
