"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock3, Mail, Pause, Play, Save, Send, Workflow } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

type PropertyRow = { id: string; name: string; organization_id: string };
type RuleRow = {
  id: string;
  property_id: string;
  name: string;
  anchor: "check_in" | "check_out";
  offset_minutes: number;
  subject_template?: string | null;
  body_template: string;
  status: "active" | "paused" | "archived";
};
type DeliveryRow = {
  id: string;
  rule_id: string;
  scheduled_for: string;
  status: string;
  recipient?: string | null;
  sent_at?: string | null;
  error_message?: string | null;
};

function offsetLabel(minutes: number) {
  if (minutes === 0) return "At event time";
  const direction = minutes < 0 ? "before" : "after";
  const absolute = Math.abs(minutes);
  if (absolute % 1440 === 0) return `${absolute / 1440} day(s) ${direction}`;
  if (absolute % 60 === 0) return `${absolute / 60} hour(s) ${direction}`;
  return `${absolute} min ${direction}`;
}

export default function JourneyCenterPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [propertyId, setPropertyId] = useState("");
  const [rules, setRules] = useState<RuleRow[]>([]);
  const [deliveries, setDeliveries] = useState<DeliveryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [coreActive, setCoreActive] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadProperties = async () => {
      const guides = await supabase
        .from("guides")
        .select("property_id")
        .eq("user_id", user.id)
        .not("property_id", "is", null);

      const ids = [...new Set((guides.data || []).map((row: any) => row.property_id).filter(Boolean))];

      if (!ids.length) {
        setCoreActive(false);
        setLoading(false);
        return;
      }

      const result = await supabase
        .from("properties")
        .select("id, name, organization_id")
        .in("id", ids);

      if (result.error) {
        setCoreActive(false);
        setLoading(false);
        return;
      }

      const rows = (result.data || []) as PropertyRow[];
      setProperties(rows);
      if (rows[0]) setPropertyId(rows[0].id);
    };

    loadProperties();
  }, [user]);

  useEffect(() => {
    if (!propertyId) return;

    const load = async () => {
      setLoading(true);

      const [rulesResult, deliveriesResult] = await Promise.all([
        supabase
          .from("journey_rules")
          .select("id, property_id, name, anchor, offset_minutes, subject_template, body_template, status")
          .eq("property_id", propertyId)
          .neq("status", "archived")
          .order("offset_minutes", { ascending: true }),
        supabase
          .from("journey_deliveries")
          .select("id, rule_id, scheduled_for, status, recipient, sent_at, error_message")
          .eq("property_id", propertyId)
          .order("scheduled_for", { ascending: false })
          .limit(50),
      ]);

      if (rulesResult.error) {
        setCoreActive(false);
        setRules([]);
      } else {
        setCoreActive(true);
        setRules((rulesResult.data || []) as RuleRow[]);
      }

      if (!deliveriesResult.error) {
        setDeliveries((deliveriesResult.data || []) as DeliveryRow[]);
      }

      setLoading(false);
    };

    load();
  }, [propertyId]);

  const deliveryCounts = useMemo(() => {
    const map: Record<string, { sent: number; failed: number; pending: number }> = {};
    for (const delivery of deliveries) {
      const current = map[delivery.rule_id] || { sent: 0, failed: 0, pending: 0 };
      if (delivery.status === "sent") current.sent += 1;
      else if (delivery.status === "failed") current.failed += 1;
      else current.pending += 1;
      map[delivery.rule_id] = current;
    }
    return map;
  }, [deliveries]);

  const updateRule = (id: string, patch: Partial<RuleRow>) => {
    setRules((current) => current.map((rule) => rule.id === id ? { ...rule, ...patch } : rule));
  };

  const saveRule = async (rule: RuleRow) => {
    setSavingId(rule.id);
    await supabase
      .from("journey_rules")
      .update({
        name: rule.name,
        anchor: rule.anchor,
        offset_minutes: Number(rule.offset_minutes),
        subject_template: rule.subject_template || null,
        body_template: rule.body_template,
        status: rule.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", rule.id);
    setSavingId(null);
  };

  const toggleRule = async (rule: RuleRow) => {
    const status = rule.status === "active" ? "paused" : "active";
    updateRule(rule.id, { status });
    await supabase
      .from("journey_rules")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", rule.id);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to operations
        </Link>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Automation</div>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">Guest Journey</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Automate the useful moments of every stay without turning hospitality into spam.
            </p>
          </div>

          {properties.length > 0 && (
            <select
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="h-11 rounded-xl border border-white/10 bg-slate-900 px-4 text-sm"
            >
              {properties.map((property) => (
                <option key={property.id} value={property.id}>{property.name}</option>
              ))}
            </select>
          )}
        </div>

        {!coreActive && !loading && (
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-100">
            Guest Journey becomes active after the hospitality and journey migrations are applied.
          </div>
        )}

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
          <div className="space-y-4">
            {rules.map((rule) => {
              const counts = deliveryCounts[rule.id] || { sent: 0, failed: 0, pending: 0 };
              return (
                <article key={rule.id} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${rule.status === "active" ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-zinc-500"}`}>
                          {rule.status}
                        </span>
                        <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                          {offsetLabel(rule.offset_minutes)}
                        </span>
                      </div>
                      <input
                        value={rule.name}
                        onChange={(e) => updateRule(rule.id, { name: e.target.value })}
                        className="mt-3 w-full bg-transparent text-xl font-bold outline-none"
                      />
                    </div>

                    <button
                      onClick={() => toggleRule(rule)}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-bold hover:bg-white/5"
                    >
                      {rule.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {rule.status === "active" ? "Pause" : "Activate"}
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Anchor</label>
                      <select
                        value={rule.anchor}
                        onChange={(e) => updateRule(rule.id, { anchor: e.target.value as RuleRow["anchor"] })}
                        className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm"
                      >
                        <option value="check_in">Check-in</option>
                        <option value="check_out">Check-out</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Offset minutes</label>
                      <input
                        type="number"
                        value={rule.offset_minutes}
                        onChange={(e) => updateRule(rule.id, { offset_minutes: Number(e.target.value || 0) })}
                        className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Email subject</label>
                    <input
                      value={rule.subject_template || ""}
                      onChange={(e) => updateRule(rule.id, { subject_template: e.target.value })}
                      className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Message</label>
                    <textarea
                      value={rule.body_template}
                      onChange={(e) => updateRule(rule.id, { body_template: e.target.value })}
                      className="min-h-28 w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-6"
                    />
                    <div className="mt-2 text-[11px] text-zinc-600">
                      Variables: {"{{guest_first_name}}"} · {"{{property_name}}"} · {"{{check_in_date}}"} · {"{{check_out_date}}"} · {"{{stay_link}}"}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-4 text-xs text-zinc-500">
                      <span>{counts.sent} sent</span>
                      <span>{counts.pending} pending</span>
                      <span>{counts.failed} failed</span>
                    </div>
                    <button
                      onClick={() => saveRule(rule)}
                      disabled={savingId === rule.id}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950 hover:bg-zinc-200 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" /> {savingId === rule.id ? "Saving…" : "Save"}
                    </button>
                  </div>
                </article>
              );
            })}

            {!loading && rules.length === 0 && coreActive && (
              <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-zinc-500">
                No journey rules yet for this property.
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-cyan-500/10 to-transparent p-6">
              <Workflow className="h-7 w-7 text-cyan-300" />
              <h2 className="mt-4 text-xl font-bold">What Maplyo orchestrates</h2>
              <div className="mt-5 space-y-3 text-sm text-zinc-400">
                <div className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 text-cyan-300" /> Personalized email from real stay data</div>
                <div className="flex gap-3"><Clock3 className="mt-0.5 h-4 w-4 text-cyan-300" /> Relative timing around check-in and checkout</div>
                <div className="flex gap-3"><Send className="mt-0.5 h-4 w-4 text-cyan-300" /> One delivery per stay/rule, idempotently</div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
              <h2 className="font-bold">Recent deliveries</h2>
              <div className="mt-4 space-y-3">
                {deliveries.slice(0, 8).map((delivery) => (
                  <div key={delivery.id} className="rounded-xl border border-white/10 bg-black/10 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{delivery.status}</span>
                      <span className="text-[10px] text-zinc-600">{new Date(delivery.sent_at || delivery.scheduled_for).toLocaleString()}</span>
                    </div>
                    {delivery.recipient && <div className="mt-1 truncate text-xs text-zinc-500">{delivery.recipient}</div>}
                    {delivery.error_message && <div className="mt-1 text-xs text-red-300">{delivery.error_message}</div>}
                  </div>
                ))}
                {!loading && deliveries.length === 0 && <div className="text-sm text-zinc-600">No deliveries yet.</div>}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
