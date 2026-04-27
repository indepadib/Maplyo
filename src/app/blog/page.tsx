import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Le Blog Maplyo | Astuces pour Hôtes Airbnb & Conciergeries",
    description: "Découvrez nos conseils d'experts pour optimiser vos revenus locatifs, créer des livrets d'accueil parfaits et offrir une expérience 5 étoiles.",
};

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

export const revalidate = 3600; // Revalidate every hour

export default async function BlogIndexPage() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('maplyo-lang')?.value || 'fr';

    const { data: posts, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, published_at, translations")
        .order("published_at", { ascending: false });

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
                    <Link href="/" className="font-black text-2xl tracking-tighter text-gray-900 hover:opacity-80 transition-opacity">
                        Maplyo
                    </Link>
                    <nav className="hidden md:flex gap-6 font-bold text-sm text-gray-500">
                        <Link href="/pricing" className="hover:text-gray-900 transition-colors">Tarifs</Link>
                        <Link href="/login" className="hover:text-gray-900 transition-colors">Connexion</Link>
                        <Link href="/signup" className="text-blue-600 hover:text-blue-700 transition-colors">Créer un guide</Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
                        Astuces pour Hôtes et <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Superhosts</span>
                    </h1>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        Des conseils pratiques, des stratégies de tarification et des astuces d'accueil pour maximiser vos revenus locatifs.
                    </p>
                </div>

                {error ? (
                    <div className="text-center p-8 bg-white rounded-3xl border border-rose-100 text-rose-500 font-bold">
                        Erreur de chargement du blog.
                    </div>
                ) : !posts || posts.length === 0 ? (
                    <div className="text-center p-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="text-4xl mb-4">✍️</div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun article pour le moment</h2>
                        <p className="text-gray-500">Revenez bientôt pour nos premiers conseils !</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => {
                            const isFr = lang === 'fr';
                            const title = isFr ? post.title : (post.translations?.[lang]?.title || post.title);
                            const excerpt = isFr ? post.excerpt : (post.translations?.[lang]?.excerpt || post.excerpt);
                            
                            return (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="group block h-full">
                                <article className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">
                                            {new Date(post.published_at).toLocaleDateString("fr-FR", { month: "long", day: "numeric", year: "numeric" })}
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                                            {title}
                                        </h2>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                            {excerpt}
                                        </p>
                                        <div className="flex items-center text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            Lire l'article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        )})}
                    </div>
                )}
            </main>
        </div>
    );
}
