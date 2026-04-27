import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export const revalidate = 3600;

export async function generateStaticParams() {
    // For static export / build time generation
    const { data: posts } = await supabase.from("blog_posts").select("slug");
    return posts?.map((post) => ({ slug: post.slug })) || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = (await params).slug; // Next.js 15 requires awaiting params
    const { data: post } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!post) {
        return {
            title: "Article Introuvable | Maplyo",
        };
    }

    return {
        title: `${post.title} | Blog Maplyo`,
        description: post.excerpt,
        keywords: post.seo_keywords,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.published_at,
            authors: ["Maplyo"],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const slug = (await params).slug;
    const { data: post, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.published_at,
        "author": {
            "@type": "Organization",
            "name": "Maplyo"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Maplyo",
            "logo": {
                "@type": "ImageObject",
                "url": "https://maplyo.com/icon.png"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-100">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <header className="bg-white border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
                    <Link href="/blog" className="text-gray-500 hover:text-gray-900 transition-colors font-bold flex items-center text-sm">
                        <span className="mr-2">←</span> Retour au blog
                    </Link>
                    <Link href="/" className="font-black text-xl tracking-tighter text-gray-900 hover:opacity-80 transition-opacity">
                        Maplyo
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
                <article>
                    <header className="mb-12 text-center">
                        <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-6">
                            Publié le {new Date(post.published_at).toLocaleDateString("fr-FR", { month: "long", day: "numeric", year: "numeric" })}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                            {post.title}
                        </h1>
                        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                            {post.excerpt}
                        </p>
                    </header>

                    <div 
                        className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-3xl"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>

                <div className="mt-24 pt-12 border-t border-gray-200 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à digitaliser votre accueil ?</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">Offrez une expérience 5 étoiles à vos voyageurs, réduisez les messages répétitifs et obtenez plus de bons avis.</p>
                    <Link href="/signup" className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                        Créer mon livret gratuit
                    </Link>
                </div>
            </main>
        </div>
    );
}
