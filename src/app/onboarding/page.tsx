"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Building2, Home, Hotel, Link2, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { bootstrapHospitalityWorkspace } from "@/lib/hospitality/bootstrap";
import { trackProductEvent } from "@/lib/analytics/product-events";

type PropertyType = "airbnb" | "hotel" | "guest_house" | "other";

const TYPES: { id: PropertyType; label: string; description: string; icon: typeof Home }[] = [
  { id: "airbnb", label: "Vacation rental", description: "Apartment, villa, Airbnb or short-term rental", icon: Home },
  { id: "guest_house", label: "Riad / guest house", description: "Riad, B&B or independent guest house", icon: Building2 },
  { id: "hotel", label: "Hotel", description: "Boutique hotel, aparthotel or independent hotel", icon: Hotel },
  { id: "other", label: "Other hospitality", description: "Serviced apartment or another accommodation type", icon: Building2 },
];

export default function OnboardingPage() {
  const { user } = useAuth();
  const [propertyType, setPropertyType] = useState<PropertyType>("airbnb");
  const [airbnbUrl, setAirbnbUrl] = useState("");
  const [city, setCity] = useState("");
  const [ownerConfirmed, setOwnerConfirmed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) trackProductEvent("onboarding_viewed");
  }, [user]);

  const isAirbnb = propertyType === "airbnb";
  const canGenerate = Boolean(city.trim() || (isAirbnb && airbnbUrl.trim() && ownerConfirmed));

  const generate = async () => {
    if (!canGenerate || !user) return;
    setIsGenerating(true);
    setError(null);

    trackProductEvent("generation_started", {
      metadata: {
        propertyType,
        source: isAirbnb && airbnbUrl.trim() ? "airbnb" : "manual_city",
      },
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
            sourceOwnerConfirmed: isAirbnb ? ownerConfirmed : undefined,
            type: propertyType,
            targetAudience: "everyone",
            language: "fr",
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Generation failed");

      trackProductEvent("generation_completed", {
        metadata: {
          propertyType,
          source: isAirbnb && airbnbUrl.trim() ? "airbnb" : "manual_city",
        },
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

      if (saveError || !saved) throw new Error(saveError?.message || "Could not save the experience");

      const workspace = await bootstrapHospitalityWorkspace(supabase, {
        userId: user.id,
        guideId: saved.id,
        propertyName: data.guide.title || city.trim() || "My Property",
        propertyType,
        city: city.trim() || undefined,
        sourceUrl: isAirbnb && airbnbUrl.trim() ? airbnbUrl.trim() : undefined,
      });

      trackProductEvent("property_created", {
        guideId: saved.id,
        propertyId: workspace.propertyId,
        metadata: {
          propertyType,
          hospitalityCoreActive: workspace.migrated,
        },
      });

      window.location.href = `/app/guides/${saved.id}/builder`;
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 shadow-xl shadow-rose-600/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-rose-300">Your first Maplyo</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Start with the property, not the settings.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">Give Maplyo the minimum information needed. You can refine everything in the builder afterwards.</p>
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-lg font-bold">1. What are you operating?</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {TYPES.map(({ id, label, description, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setPropertyType(id)}
                className={`rounded-2xl border p-4 text-left transition ${propertyType === id ? "border-rose-400/60 bg-rose-500/10" : "border-white/10 bg-black/10 hover:bg-white/5"}`}
              >
                <Icon className="h-5 w-5 text-rose-300" />
                <p className="mt-3 font-bold">{label}</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold">2. Give Maplyo a starting point</h2>
            {isAirbnb && (
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-zinc-300">Airbnb listing link</label>
                <div className="relative">
                  <Link2 className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                  <input
                    value={airbnbUrl}
                    onChange={(e) => setAirbnbUrl(e.target.value)}
                    placeholder="https://www.airbnb.com/rooms/..."
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 outline-none focus:border-rose-400/50"
                  />
                </div>
                <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs leading-5 text-zinc-400">
                  <input type="checkbox" checked={ownerConfirmed} onChange={(e) => setOwnerConfirmed(e.target.checked)} className="mt-1" />
                  <span>I own, manage, or am authorized to use the listing information I provide to Maplyo.</span>
                </label>
              </div>
            )}

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                {isAirbnb ? "City (recommended fallback)" : "City"}
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
            {isGenerating ? <><Loader2 className="h-5 w-5 animate-spin" /> Building your guest experience…</> : <>Generate my Maplyo <ArrowRight className="h-5 w-5" /></>}
          </button>

          <p className="mt-3 text-center text-xs text-zinc-600">No plan selection now. See the value first; choose a paid plan when you need paid capabilities.</p>
        </section>
      </div>
    </main>
  );
}
