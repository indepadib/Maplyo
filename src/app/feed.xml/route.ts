import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: posts } = await supabase
        .from('blog_posts')
        .select('title, slug, excerpt, published_at')
        .order('published_at', { ascending: false })
        .limit(20);

    const site_url = 'https://maplyo.com';

    const feedItems = (posts || []).map((post) => {
        return `
            <item>
                <title><![CDATA[${post.title}]]></title>
                <link>${site_url}/blog/${post.slug}</link>
                <guid>${site_url}/blog/${post.slug}</guid>
                <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
                <description><![CDATA[${post.excerpt}]]></description>
            </item>
        `;
    }).join('');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
            <channel>
                <title>Blog Maplyo</title>
                <link>${site_url}/blog</link>
                <description>Astuces pour hôtes et superhosts Airbnb, conciergeries et locations saisonnières.</description>
                <language>fr</language>
                <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
                ${feedItems}
            </channel>
        </rss>`;

    return new NextResponse(rssFeed, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
        },
    });
}
