"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, Loader2, Sparkles } from "lucide-react";

const PROPERTY_TYPES = [
  ["property_manager", "Property manager / Concierge"],
  ["hotel", "Hotel"],
  ["guest_house", "Riad / Guest house"],
  ["vacation_rental", "Vacation rental"],
  ["aparthotel", "Aparthotel"],
  ["serviced_apartment", "Serviced apartments"],
  ["other", "Other hospitality"],
] as const;

export default function ContactSalesPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    propertyName: "",
    websiteUrl: "",
    city: "",
    propertyType: "property_manager",
    estimatedUnits: "",
    message: "",
    companyFax: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attribution, setAttribution] = useState<Record<string, string>>({});

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    setAttribution({
      source: qs.get("source") || "contact_sales",
      utmSource: qs.get("utm_source") || "",
      utmMedium: qs.get("utm_medium") || "",
      utmCampaign: qs.get("utm_campaign") || "",
      referrer: document.referrer || "",
    });

    const type = qs.get("type");
    if (PROPERTY_TYPES.some(([value]) => value === type)) {
      setForm((current) => ({ ...current, propertyType: type as any }));
    }
  }, []);

  const canSubmit = useMemo(
    () => Boolean(form.name.trim() && form.email.trim() && form.propertyType),
    [form.name, form.email, form.propertyType]
  );

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          estimatedUnits: form.estimatedUnits ? Number(form.estimatedUnits) : undefined,
          ...attribution,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not submit your request.");
      setSuccess(true);
    } catch (e: any) {
      setError(e?.message || "Could not submit your request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/pricing" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to pricing
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="pt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
              <Sparkles className="h-4 w-4" /> Portfolio & Hotel
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Build the guest layer around your operation.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">
              Tell us what you operate. We&apos;ll scope the fastest way to deploy Maplyo across your properties, rooms or guest journey without replacing your PMS or channel manager.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Multi-property guest experiences",
                "AI concierge grounded in your property information",
                "Guest service requests and Revenue Center",
                "Hotel / riad website import and personalized setup",
                "Integration planning around your existing stack",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-violet-300" />
                <div>
                  <div className="font-bold">Want to see your own property first?</div>
                  <p className="mt-1 text-sm text-zinc-500">We can prepare a personalized Magic Demo from your property website before the call.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl md:p-8">
            {success ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mt-6 text-3xl font-bold">Request received.</h2>
                <p className="mt-3 max-w-md text-zinc-400">
                  Your operation is now in the Maplyo sales pipeline. We&apos;ll use the information you provided to prepare the next relevant step.
                </p>
                <Link href="/demo" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950">
                  Explore the live demo <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">Talk to Maplyo</div>
                  <h2 className="mt-2 text-2xl font-bold">Tell us about your operation</h2>
                  <p className="mt-2 text-sm text-zinc-500">No generic enterprise form. These details help us prepare a relevant demo and rollout scope.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Your name *"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
                  <Field label="Business email *"><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></Field>
                  <Field label="Phone"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
                  <Field label="Property / company"><input value={form.propertyName} onChange={(e) => setForm({ ...form, propertyName: e.target.value })} /></Field>
                  <Field label="Website"><input type="url" value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} placeholder="https://..." /></Field>
                  <Field label="City"><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
                  <Field label="Operation type">
                    <select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })}>
                      {PROPERTY_TYPES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </Field>
                  <Field label="Rooms / properties">
                    <input type="number" min="1" max="10000" value={form.estimatedUnits} onChange={(e) => setForm({ ...form, estimatedUnits: e.target.value })} placeholder="25" />
                  </Field>
                </div>

                <Field label="What do you want Maplyo to improve?">
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Guest questions, upsells, multi-property consistency, hotel services, pre-arrival…" />
                </Field>

                <div className="hidden" aria-hidden="true">
                  <label>Company fax<input tabIndex={-1} autoComplete="off" value={form.companyFax} onChange={(e) => setForm({ ...form, companyFax: e.target.value })} /></label>
                </div>

                {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-rose-600 font-bold shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</> : <>Request a tailored demo <ArrowRight className="h-5 w-5" /></>}
                </button>

                <p className="text-center text-[11px] leading-5 text-zinc-600">
                  We use these details only to respond to your Maplyo business inquiry and prepare the requested sales follow-up.
                </p>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</span>
      <div className="[&_input]:h-12 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-black/20 [&_input]:px-4 [&_input]:text-white [&_input]:outline-none [&_input]:focus:border-violet-400/50 [&_select]:h-12 [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-white/10 [&_select]:bg-slate-900 [&_select]:px-4 [&_select]:text-white [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-black/20 [&_textarea]:p-4 [&_textarea]:text-white [&_textarea]:outline-none [&_textarea]:focus:border-violet-400/50">
        {children}
      </div>
    </label>
  );
}
