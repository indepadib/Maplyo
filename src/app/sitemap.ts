import { MetadataRoute } from 'next'
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://maplyo.com' // Replace with your actual domain
    const languages = ['fr', 'en', 'es', 'ar']

    const routes = [
        { path: '', priority: 1, freq: 'weekly' as const },
        { path: '/pricing', priority: 0.8, freq: 'weekly' as const },
        { path: '/login', priority: 0.5, freq: 'yearly' as const },
        { path: '/signup', priority: 0.5, freq: 'yearly' as const },
        { path: '/blog', priority: 0.9, freq: 'daily' as const },
    ]

    // Fetch dynamic blog posts
    const { data: posts } = await supabase.from("blog_posts").select("slug, published_at");
    
    const blogRoutes = (posts || []).map(post => ({
        path: `/blog/${post.slug}`,
        priority: 0.7,
        freq: 'weekly' as const,
        lastModified: new Date(post.published_at)
    }));

    const allRoutes = [...routes, ...blogRoutes];

    return allRoutes.map(route => ({
        url: `${baseUrl}${route.path}`,
        lastModified: (route as any).lastModified || new Date(),
        changeFrequency: route.freq,
        priority: route.priority,
        alternates: {
            languages: languages.reduce((acc, lang) => {
                acc[lang] = `${baseUrl}/${lang}${route.path}`
                return acc
            }, {} as Record<string, string>)
        }
    }))
}
