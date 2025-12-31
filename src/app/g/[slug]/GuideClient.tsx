"use client";
import { useEffect, useState, useMemo } from "react";
import type { Guide } from "@/types/blocks";
import { StyledGuideRenderer } from "@/components/guide/StyledGuideRenderer";
import { UnlockPanel } from "@/components/guide/UnlockPanel";
import Link from "next/link";

const LS_UNLOCK = (slug: string) => `eguidehq_unlock_${slug}`;

export function GuideClient({ guide: initialGuide }: { guide: Guide }) {
  const [guide, setGuide] = useState<Guide>(initialGuide);
  const [unlocked, setUnlocked] = useState(false);

  // Check if guide actually requires unlocking
  const requiresUnlock = useMemo(() => {
    return guide.blocks.some(b =>
      (b.type === 'wifi' || b.type === 'access_codes') &&
      b.visibility?.mode === 'with_code'
    );
  }, [guide.blocks]);

  // Sync with local storage for Demo purposes (legacy)
  useEffect(() => {
    try {
      // 1. Check Unlock Status
      const isAlreadyUnlocked = window.localStorage.getItem(LS_UNLOCK(initialGuide.slug)) === "1";
      setUnlocked(isAlreadyUnlocked);

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

  const showLockModal = requiresUnlock && !unlocked;

  return (
    <>
      <style jsx global>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>

      {/* Le Guide Rendu */}
      <StyledGuideRenderer guide={guide} unlocked={unlocked || !requiresUnlock} />

      {/* Panel de déverrouillage (si verrouillé) */}
      {showLockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-300">
            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accès sécurisé</h3>
              <p className="text-sm text-gray-500">Veuillez déverrouiller ce guide pour accéder aux codes d'accès et informations sensibles.</p>
            </div>

            <UnlockPanel guide={guide} onUnlocked={onUnlocked} />

            {guide.slug === 'demo' && (
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Code de démonstration</p>
                <div className="text-2xl font-mono font-bold text-gray-800 tracking-[0.5em]">2580</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
