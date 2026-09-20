"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, CircleDollarSign, MousePointerClick, PackageOpen, ShoppingBag, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

type LegacyService = {
  key: string;
  guideId: string;
  guideTitle: string;
  title: string;
  category: string;
  price: string;
};

type GuestEvent = {
  event_name: string;
  service_key: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
};

type OrderRow = {
  id: string;
  status: string;
  total_amount: number | string | null;
  commission_amount: number | string | null;
  currency: string | null;
  created_at: string;
};

function legacyKey(item: any, index: number) {
  return item.id || item.serviceId || `legacy_${String(item.title || "service").toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${index}`;
}

function displayPrice(item: any) {
  if (item.price) return String(item.price);
  if (item.priceAmount !== undefined && item.priceAmount !== null && item.priceAmount !== "") {
    return `${item.priceAmount} ${item.currency || "MAD"}`;
  }
  return "On request";
}

export default function RevenuePage() {
  const { user } = useAuth();
  const [services, setServices] = useState<LegacyService[]>([]);
  const [events, setEvents] = useState<GuestEvent[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [revenueCoreActive, setRevenueCoreActive] = useState(false);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);

      const guidesResult = await supabase
        .from("guides")
        .select("id, title, content")
        .eq("user_id", user.id);

      const guideIds = (guidesResult.data || []).map((guide: any) => guide.id);
      const extracted: LegacyService[] = [];

      for (const guide of guidesResult.data || []) {
        const blocks = Array.isArray((guide as any).content?.blocks) ? (guide as any).content.blocks : [];
        const upsellBlocks = blocks.filter((block: any) => block.type === "upsells");

        for (const block of upsellBlocks) {
          const items = Array.isArray(block.data?.items) ? block.data.items : [];
          items.forEach((item: any, index: number) => {
            extracted.push({
              key: legacyKey(item, index),
              guideId: guide.id,
              guideTitle: guide.title,
              title: item.title || "Service",
              category: item.category || "other",
              price: displayPrice(item),
            });
          });
        }
      }

      setServices(extracted);

      if (guideIds.length) {
        const eventResult = await supabase
          .from("guest_events")
          .select("event_name, service_key, metadata, created_at")
          .in("guide_id", guideIds)
          .order("created_at", { ascending: false })
          .limit(1000);

        if (!eventResult.error) setEvents((eventResult.data || []) as GuestEvent[]);
      }

      const ordersResult = await supabase
        .from("orders")
        .select("id, status, total_amount, commission_amount, currency, created_at")
        .order("created_at", { ascending: false })
        .limit(500);

      if (!ordersResult.error) {
        setOrders((ordersResult.data || []) as OrderRow[]);
        setRevenueCoreActive(true);
      } else {
        setRevenueCoreActive(false);
      }

      setLoading(false);
    };

    load();
  }, [user]);

  const clicksByService = useMemo(() => {
    const counts: Record<string, number> = {};
    events
      .filter((event) => event.event_name === "service_cta" && event.service_key)
      .forEach((event) => {
        counts[event.service_key as string] = (counts[event.service_key as string] || 0) + 1;
      });
    return counts;
  }, [events]);

  const totalClicks = events.filter((event) => event.event_name === "service_cta").length;
  const requests = events.filter((event) => event.event_name === "service_request").length;
  const paidOrders = orders.filter((order) => ["paid", "fulfilled"].includes(order.status));
  const grossRevenue = paidOrders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  const commissionRevenue = paidOrders.reduce((sum, order) => sum + Number(order.commission_amount || 0), 0);
  const mainCurrency = paidOrders.find((order) => order.currency)?.currency || "MAD";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to operations
        </Link>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Revenue Center</div>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">Turn guest attention into revenue.</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">Measure which services guests want, then connect demand to orders and payments.</p>
          </div>
          <Link href="/dashboard" className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold hover:bg-white/10">
            Manage properties
          </Link>
        </div>

        {!revenueCoreActive && !loading && (
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
            Revenue analytics are already instrumented in the product. Native orders will appear here automatically once the hospitality database migration is activated.
          </div>
        )}

        <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Live services", value: services.length, icon: ShoppingBag, hint: "Across your guest experiences" },
            { label: "Service clicks", value: totalClicks, icon: MousePointerClick, hint: "High-intent guest interactions" },
            { label: "Requests", value: requests, icon: PackageOpen, hint: "Guests asking for services" },
            { label: "Gross revenue", value: revenueCoreActive ? `${grossRevenue.toFixed(0)} ${mainCurrency}` : "—", icon: CircleDollarSign, hint: revenueCoreActive ? `Maplyo commission: ${commissionRevenue.toFixed(0)} ${mainCurrency}` : "Activates with native orders" },
          ].map(({ label, value, icon: Icon, hint }) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</span>
                <Icon className="h-5 w-5 text-emerald-300" />
              </div>
              <div className="mt-5 text-3xl font-bold">{loading ? "…" : value}</div>
              <div className="mt-1 text-xs text-zinc-600">{hint}</div>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-emerald-300" />
              <h2 className="text-xl font-bold">Service performance</h2>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              {services.length === 0 && !loading ? (
                <div className="p-8 text-center text-zinc-500">
                  No revenue services yet. Add an Upsells / Revenue Services block in a property experience.
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {services
                    .slice()
                    .sort((a, b) => (clicksByService[b.key] || 0) - (clicksByService[a.key] || 0))
                    .map((service) => (
                      <div key={`${service.guideId}-${service.key}`} className="grid grid-cols-[1fr_auto] gap-4 p-4 hover:bg-white/[0.025]">
                        <div className="min-w-0">
                          <div className="font-bold">{service.title}</div>
                          <div className="mt-1 flex flex-wrap gap-2 text-xs text-zinc-500">
                            <span>{service.guideTitle}</span>
                            <span>•</span>
                            <span>{service.category.replaceAll("_", " ")}</span>
                            <span>•</span>
                            <span>{service.price}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">{clicksByService[service.key] || 0}</div>
                          <div className="text-[10px] uppercase tracking-wider text-zinc-600">clicks</div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-gradient-to-b from-emerald-500/10 to-transparent p-6">
            <TrendingUp className="h-7 w-7 text-emerald-300" />
            <h2 className="mt-5 text-2xl font-bold">Revenue playbook</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Start with services that are easy to fulfill and naturally linked to the stay.</p>
            <div className="mt-6 space-y-3">
              {["Late checkout", "Airport transfer", "Breakfast", "Early check-in", "Spa / wellness", "Local experiences"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm font-medium">{item}</div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
