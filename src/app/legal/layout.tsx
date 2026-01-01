import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-rose-500/30 text-white relative overflow-x-hidden">
            {/* --- Dynamic Background --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-600/10 via-transparent to-transparent opacity-50" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
            </div>

            {/* --- Navigation Bar --- */}
            <nav className="fixed top-0 left-0 right-0 z-50 py-6 backdrop-blur-md bg-slate-950/50 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Retour à l'accueil</span>
                    </Link>

                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 via-purple-600 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
                            <span className="font-bold text-white text-sm">M</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                            Maplyo
                        </span>
                    </Link>

                    {/* Placeholder for balance/layout */}
                    <div className="w-24" />
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto bg-slate-900/50 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                    {/* Prose Content styling within the Component */}
                    {children}
                </div>
            </main>

            <footer className="border-t border-white/5 bg-black/30 py-8 text-center text-zinc-600 text-sm relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    © {new Date().getFullYear()} Maplyo. Tous droits réservés.
                </div>
            </footer>
        </div>
    );
}
