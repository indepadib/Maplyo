import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6">
            <h1 className="text-9xl font-black text-rose-100">404</h1>
            <div className="bg-white p-8 rounded-3xl shadow-xl -mt-12 relative z-10 max-w-md w-full">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Oups ! Page introuvable.</h2>
                <p className="text-slate-500 mb-8">
                    Il semblerait que vous ayez pris un chemin de traverse. Ce guide n'existe pas (ou plus).
                </p>
                <Link href="/">
                    <Button className="w-full bg-slate-900 text-white hover:bg-black">
                        Retour à l'accueil
                    </Button>
                </Link>
            </div>
        </div>
    );
}
