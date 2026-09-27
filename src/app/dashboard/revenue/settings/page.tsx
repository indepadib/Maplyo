"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CreditCard, ExternalLink, Landmark, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

type PropertyOption = {
  id: string;
  name: string;
  city?: string | null;
  organization_id: string;
};

type PaymentSettings = {
  property_id: string;
  organization_id: string;
  payment_mode: "request_only" | "pay_at_property" | "external_link" | "provider_checkout";
  provider: "none" | "stripe_connect" | "cmi" | "payzone" | "naps" | "other";
  provider_status: "not_connected" | "pending" | "active" | "restricted" | "disabled";
  settlement_model: "property_direct" | "platform_split" | "platform_merchant";
  default_currency: string;
  platform_commission_rate: number;
};

const defaultSettings = (property: PropertyOption): PaymentSettings => ({
  property_id: property.id,
  organization_id: property.organization_id,
  payment_mode: "request_only",
  provider: "none",
  provider_status: "not_connected",
  settlement_model: "property_direct",
  default_currency: "MAD",
  platform_commission_rate: 0,
});

export default function RevenueSettingsPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<PropertyOption[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [settings, setSettings] = useState<PaymentSettings | null>(null);
  const [coreActive, setCoreActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const guides = await supabase
        .from("guides")
        .select("property_id")
        .eq("user_id", user.id)
        .not("property_id", "is", null);

      const ids = [...new Set((guides.data || []).map((row: any) => row.property_id).filter(Boolean))];
      if (!ids.length) {
        setCoreActive(false);
        return;
      }

      const result = await supabase
        .from("properties")
        .select("id, name, city, organization_id")
        .in("id", ids);

      if (result.error) {
        setCoreActive(false);
        return;
      }

      const rows = (result.data || []) as PropertyOption[];
      setProperties(rows);
      if (rows[0]) setSelectedId(rows[0].id);
    };

    load();
  }, [user]);

  useEffect(() => {
    if (!selectedId) return;
    const property = properties.find((item) => item.id === selectedId);
    if (!property) return;

    const loadSettings = async () => {
      const result = await supabase
        .from("property_payment_settings")
        .select("property_id, organization_id, payment_mode, provider, provider_status, settlement_model, default_currency, platform_commission_rate")
        .eq("property_id", selectedId)
        .maybeSingle();

      if (result.error) {
        setSettings(defaultSettings(property));
        return;
      }

      setSettings(result.data ? result.data as PaymentSettings : defaultSettings(property));
    };

    loadSettings();
  }, [selectedId, properties]);

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    setSaved(false);

    const result = await supabase
      .from("property_payment_settings")
      .upsert({
        ...settings,
        updated_at: new Date().toISOString(),
      }, { onConflict: "property_id" });

    if (!result.error) setSaved(true);
    setSaving(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/dashboard/revenue" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Revenue Center
        </Link>

        <div className="mt-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Payments</div>
          <h1 className="mt-3 text-4xl font-bold">Choose how the property gets paid.</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Maplyo separates guest ordering from payment processing so each market can use the right provider without rebuilding the guest journey.
          </p>
        </div>

        {!coreActive ? (
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-100">
            Hospitality core is not active in the database yet. Payment settings will become available after the migrations are applied.
          </div>
        ) : (
          <>
            <div className="mt-8">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Property</label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="h-12 w-full max-w-xl rounded-xl border border-white/10 bg-slate-900 px-4 text-white outline-none"
              >
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>{property.name}{property.city ? ` — ${property.city}` : ""}</option>
                ))}
              </select>
            </div>

            {settings && (
              <section className="mt-8 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      id: "request_only",
                      icon: ShieldCheck,
                      title: "Request only",
                      text: "Guest sends a request. Property confirms and arranges payment separately.",
                    },
                    {
                      id: "pay_at_property",
                      icon: Landmark,
                      title: "Pay at property",
                      text: "Maplyo confirms the order; payment is collected directly by the property.",
                    },
                    {
                      id: "external_link",
                      icon: ExternalLink,
                      title: "External payment link",
                      text: "Each service may redirect to the property or provider checkout URL.",
                    },
                    {
                      id: "provider_checkout",
                      icon: CreditCard,
                      title: "Embedded provider checkout",
                      text: "Future-ready mode for CMI, Payzone, NAPS, Stripe Connect or another supported provider.",
                    },
                  ].map(({ id, icon: Icon, title, text }) => (
                    <button
                      type="button"
                      key={id}
                      onClick={() => setSettings({ ...settings, payment_mode: id as PaymentSettings["payment_mode"] })}
                      className={`rounded-2xl border p-5 text-left transition ${settings.payment_mode === id ? "border-emerald-400/50 bg-emerald-400/10" : "border-white/10 bg-white/[0.025] hover:bg-white/5"}`}
                    >
                      <Icon className="h-5 w-5 text-emerald-300" />
                      <div className="mt-4 font-bold">{title}</div>
                      <div className="mt-1 text-sm leading-6 text-zinc-500">{text}</div>
                    </button>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                  <h2 className="text-xl font-bold">Commercial settings</h2>
                  <div className="mt-5 grid gap-5 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Currency</label>
                      <select
                        value={settings.default_currency}
                        onChange={(e) => setSettings({ ...settings, default_currency: e.target.value })}
                        className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3"
                      >
                        <option value="MAD">MAD</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Settlement</label>
                      <select
                        value={settings.settlement_model}
                        onChange={(e) => setSettings({ ...settings, settlement_model: e.target.value as PaymentSettings["settlement_model"] })}
                        className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3"
                      >
                        <option value="property_direct">Property direct</option>
                        <option value="platform_split">Platform split</option>
                        <option value="platform_merchant">Platform merchant</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Maplyo commission %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={settings.platform_commission_rate}
                        onChange={(e) => setSettings({ ...settings, platform_commission_rate: Number(e.target.value || 0) })}
                        className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-bold">Payment provider</div>
                      <div className="mt-1 text-sm text-zinc-500">
                        Provider credentials are intentionally not stored here. Connection happens server-side through provider-specific onboarding.
                      </div>
                    </div>
                    <div className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-zinc-400">{settings.provider_status.replaceAll("_", " ")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={save} disabled={saving} className="rounded-xl bg-emerald-400 px-5 py-3 font-bold text-slate-950 hover:bg-emerald-300 disabled:opacity-50">
                    {saving ? "Saving…" : "Save payment settings"}
                  </button>
                  {saved && <span className="inline-flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Saved</span>}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
