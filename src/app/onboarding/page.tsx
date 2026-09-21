"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Building2, Home, Hotel, Link2, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { MarketingLanguageSwitcher } from "@/components/marketing/MarketingLanguageSwitcher";
import { onboardingCopy } from "@/lib/i18n/onboarding";
import { bootstrapHospitalityWorkspace } from "@/lib/hospitality/bootstrap";
import { trackProductEvent } from "@/lib/analytics/product-events";

type PropertyType = "airbnb" | "hotel" | "guest_house" | "other";

const TYPE_ICONS: Record<PropertyType, typeof Home> = {
  airbnb: Home,
  guest_house: Building2,
  hotel: Hotel,
  other: Building2,
};

export default function OnboardingPage() {
  const { user } = useAuth();
  const { lang } = useTranslation();
  const t = onboardingCopy(lang);

  const [propertyType, setPropertyType] = useState<PropertyType>("airbnb");
  const [airbnbUrl, setAirbnbUrl] = useState("");
  const [propertyUrl, setPropertyUrl] = useState("");
  const [city, setCity] = useState("");
  const [ownerConfirmed, setOwnerConfirmed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) trackProductEvent("onboarding_viewed");
  }, [user]);

  useEffect(() => {
    if (!isGenerating) {
      setProgressIndex(0);
      return;
    }

    const interval = window.setInterval(() => {
      setProgressIndex((current) => Math.min(current + 1, t.generatingSteps.length - 1));
    }, 2200);

    return () => window.clearInterval(interval);
  }, [isGenerating, t.generatingSteps.length]);

  const isAirbnb = propertyType === "airbnb";
  const sourceUrl = isAirbnb ? airbnbUrl.trim() : propertyUrl.trim();
  const sourceKind = isAirbnb ? "airbnb" : (sourceUrl ? "website" : "manual_city");
  const canGenerate = sourceUrl ? ownerConfirmed : Boolean(city.trim());

  const typeOptions = useMemo(
    () => (["airbnb", "guest_house", "hotel", "other"] as PropertyType[]).map((id) => ({
      id,
      ...t.types[id],
      icon: TYPE_ICONS[id],
    })),
    [t]
  );

  const generate = async () => {
    if (!canGenerate || !user) return;

    setIsGenerating(true);
    setError(null);

    trackProductEvent("generation_started", {
      metadata: { propertyType, source: sourceKind, language: lang },
    });

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: {
            city: city.trim() || undefined,
            airbnbUrl: isAirbnb && airbnbUrl.trim() ? airbnbUrl.trim() : undefined,
            propertyUrl: !isAirbnb && propertyUrl.trim() ? propertyUrl.trim() : undefined,
            sourceOwnerConfirmed: sourceUrl ? ownerConfirmed : undefined,
            type: propertyType,
            targetAudience: "everyone",
            language: lang,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || t.errors.generic);

      trackProductEvent("generation_completed", {
        metadata: { propertyType, source: sourceKind, language: lang },
      });

      const { data: saved, error: saveError } = await supabase
        .from("guides")
        .insert([{
          ...data.guide,
          id: undefined,
          slug: `${data.guide.slug}-${Math.floor(Math.random() * 1000)}`,
          user_id: user.id,
        }])
        .select()
        .single();

      if (saveError || !saved) throw new Error(saveError?.message || t.errors.save);

      const workspace = await bootstrapHospitalityWorkspace(supabase, {
        userId: user.id,
        guideId: saved.id,
        propertyName: data.guide.title || city.trim() || "My Property",
        propertyType,
        city: city.trim() || undefined,
        sourceUrl: sourceUrl || undefined,
      });

      trackProductEvent("property_created", {
        guideId: saved.id,
        propertyId: workspace.propertyId,
        metadata: {
          propertyType,
          hospitalityCoreActive: workspace.migrated,
          language: lang,
        },
      });

      window.location.href = `/app/guides/${saved.id}/builder`;
    } catch (e: any) {
      setError(e?.message || t.errors.generic);
      setIsGenerating(false);
    }
  };

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-slate-950 px-5 py-10 text-white">
      <div className="absolute right-5 top-5 z-20">
        <MarketingLanguageSwitcher compact />
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 shadow-xl shadow-rose-600/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-rose-300">{t.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">{t.subtitle}</p>
          <div className="mt-5 inline-flex rounded-full border border-emerald-400/15 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-200">
            {t.offer}
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-lg font-bold">{t.typeTitle}</h2>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {typeOptions.map(({ id, label, description, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setPropertyType(id);
                  setOwnerConfirmed(false);
                }}
                className={`rounded-2xl border p-4 text-left transition rtl:text-right ${propertyType === id ? "border-rose-400/60 bg-rose-500/10" : "border-white/10 bg-black/10 hover:bg-white/5"}`}
              >
                <Icon className="h-5 w-5 text-rose-300" />
                <p className="mt-3 font-bold">{label}</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold">{t.sourceTitle}</h2>

            {isAirbnb ? (
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-zinc-300">{t.airbnbLabel}</label>
                <div className="relative">
                  <Link2 className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500 rtl:left-auto rtl:right-4" />
                  <input
                    value={airbnbUrl}
                    onChange={(e) => setAirbnbUrl(e.target.value)}
                    placeholder="https://www.airbnb.com/rooms/..."
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 outline-none focus:border-rose-400/50 rtl:pl-4 rtl:pr-11"
                  />
                </div>
                {airbnbUrl.trim() && (
                  <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs leading-5 text-zinc-400">
                    <input type="checkbox" checked={ownerConfirmed} onChange={(e) => setOwnerConfirmed(e.target.checked)} className="mt-1" />
                    <span>{t.authorizationAirbnb}</span>
                  </label>
                )}
              </div>
            ) : (
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-zinc-300">{t.websiteLabel}</label>
                <div className="relative">
                  <Link2 className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500 rtl:left-auto rtl:right-4" />
                  <input
                    value={propertyUrl}
                    onChange={(e) => setPropertyUrl(e.target.value)}
                    placeholder="https://www.yourhotel.com"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 outline-none focus:border-rose-400/50 rtl:pl-4 rtl:pr-11"
                  />
                </div>
                {propertyUrl.trim() && (
                  <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs leading-5 text-zinc-400">
                    <input type="checkbox" checked={ownerConfirmed} onChange={(e) => setOwnerConfirmed(e.target.checked)} className="mt-1" />
                    <span>{t.authorizationWebsite}</span>
                  </label>
                )}
              </div>
            )}

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                {sourceUrl ? t.cityFallback : t.city}
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Marrakech"
                className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 outline-none focus:border-rose-400/50"
              />
            </div>
          </div>

          {error && <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

          <button
            onClick={generate}
            disabled={!canGenerate || isGenerating}
            className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-purple-600 text-base font-bold shadow-lg shadow-rose-600/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{t.generating}</span>
              </>
            ) : (
              <>
                {t.generate} <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          {isGenerating && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-purple-500 transition-all duration-700"
                  style={{ width: `${((progressIndex + 1) / t.generatingSteps.length) * 100}%` }}
                />
              </div>
              <div className="mt-3 text-center text-xs font-medium text-zinc-400">
                {t.generatingSteps[progressIndex]}
              </div>
            </div>
          )}

          <p className="mt-4 text-center text-xs text-zinc-600">{t.reassurance}</p>
        </section>
      </div>
    </main>
  );
}
