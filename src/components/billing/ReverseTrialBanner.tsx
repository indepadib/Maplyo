"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { trialCopy } from "@/lib/i18n/trial";

export function ReverseTrialBanner({ className = "" }: { className?: string }) {
  const { user } = useAuth();
  const { lang } = useTranslation();
  const t = trialCopy(lang);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("plan_variant, subscription_status, trial_ends_at")
        .eq("id", user.id)
        .maybeSingle();

      if (!data?.trial_ends_at) return;
      if (data.plan_variant === "pro" && data.subscription_status === "active") return;

      const remainingMs = new Date(data.trial_ends_at).getTime() - Date.now();
      if (remainingMs <= 0) return;

      setDaysLeft(Math.max(1, Math.ceil(remainingMs / (24 * 60 * 60 * 1000))));
    };

    load();
  }, [user]);

  if (daysLeft === null) return null;

  return (
    <div className={`rounded-2xl border border-purple-400/20 bg-gradient-to-r from-purple-500/10 to-rose-500/10 p-4 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-400/10">
            <Sparkles className="h-4 w-4 text-purple-300" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">
              {t.active} {daysLeft} {daysLeft === 1 ? t.day : t.days}
            </div>
            <div className="mt-1 text-xs leading-5 text-zinc-500">{t.fallback}</div>
          </div>
        </div>
        <Link href="/pricing" className="rounded-xl bg-white px-4 py-2 text-center text-xs font-bold text-slate-950 hover:bg-zinc-200">
          {t.cta}
        </Link>
      </div>
    </div>
  );
}
