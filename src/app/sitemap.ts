import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://maplyo.com' // Replace with your actual domain
    const languages = ['fr', 'en', 'es', 'ar']

    const routes = [
        { path: '', priority: 1, freq: 'weekly' as const },
        { path: '/pricing', priority: 0.8, freq: 'weekly' as const },
        { path: '/login', priority: 0.5, freq: 'yearly' as const },
        { path: '/signup', priority: 0.5, freq: 'yearly' as const },
    ]

    return routes.map(route => ({
        url: `${baseUrl}${route.path}`,
        lastModified: new Date(),
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
