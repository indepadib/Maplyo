"use client";
import { useEffect, useState } from "react";
import type { Guide } from "@/types/blocks";
import { StyledGuideRenderer } from "@/components/guide/StyledGuideRenderer";
import { UnlockPanel } from "@/components/guide/UnlockPanel";
import Link from "next/link";

const LS_UNLOCK = (slug: string) => `eguidehq_unlock_${slug}`;

export function GuideClient({ guide: initialGuide }: { guide: Guide }) {
  const [guide, setGuide] = useState<Guide>(initialGuide);
  const [unlocked, setUnlocked] = useState(false);

  // Sync with local storage for Demo purposes (legacy)
  useEffect(() => {
    try {
      // 1. Check Unlock Status
      setUnlocked(window.localStorage.getItem(LS_UNLOCK(initialGuide.slug)) === "1");

      // 2. Legacy "demo" fallback
      if (initialGuide.slug === "demo") {
        const STORAGE_KEY = "eguidehq_demo_guide_v1";
        const rawLegacy = window.localStorage.getItem(STORAGE_KEY);
        if (rawLegacy) {
          const localGuide = JSON.parse(rawLegacy);
          if (localGuide.id === "demo") {
            setGuide(prev => ({ ...prev, ...localGuide }));
          }
        }
      }
    } catch { }
  }, [initialGuide.slug, initialGuide.id]);

  function onUnlocked() {
    setUnlocked(true);
    try { window.localStorage.setItem(LS_UNLOCK(guide.slug), "1"); } catch { }
  }

  return (
    <>
      <style jsx global>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>

      {/* Menu discret en bas pour navigation (style app mobile) - Masqué sur desktop */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 pb-safe pt-2 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex items-center justify-between h-14">
          <Link href="/" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition-colors">
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-medium uppercase">Accueil</span>
          </Link>

          {/* Un dummy "Menu" central pour le style */}
          <div className="relative -top-6">
            <Link href="/app/guides/demo/builder">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                ✏️
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-medium uppercase">Profil</span>
          </div>
        </div>
      </div>

      {/* Le Guide Rendu */}
      <StyledGuideRenderer guide={guide} unlocked={unlocked} />

      {/* Panel de déverrouillage (si verrouillé) */}
      {!unlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-300">
            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accès sécurisé</h3>
              <p className="text-sm text-gray-500">Veuillez déverrouiller ce guide pour accéder aux codes d'accès et informations sensibles.</p>
            </div>

            <UnlockPanel guide={guide} onUnlocked={onUnlocked} />

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Code de démonstration</p>
              <div className="text-2xl font-mono font-bold text-gray-800 tracking-[0.5em]">2580</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
