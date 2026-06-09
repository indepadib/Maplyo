import { CanvasShop } from "@/components/dashboard/CanvasShop";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch the user's first guide URL to pre-fill the QR code
    const { data: guides } = await supabase
        .from("guides")
        .select("slug")
        .eq("user_id", user.id)
        .limit(1);

    const guideSlug = guides && guides.length > 0 ? guides[0].slug : "demo";
    const guideUrl = `https://maplyo.com/g/${guideSlug}`;

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Boutique Pro</h1>
                <p className="text-gray-500">Commandez vos supports physiques pour sublimer l'accueil de vos voyageurs.</p>
            </div>
            
            <CanvasShop guideUrl={guideUrl} />
        </div>
    );
}
