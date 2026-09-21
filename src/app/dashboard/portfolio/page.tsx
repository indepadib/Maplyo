"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Building2,
  CalendarDays,
  CircleAlert,
  CircleDollarSign,
  Eye,
  ExternalLink,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

type Organization = { id: string; name: string; role: string };

type PropertyRow = {
  id: string;
  name: string;
  propertyType: string;
  status: string;
  city?: string | null;
  countryCode?: string | null;
  guide?: { id: string; slug: string; published: boolean } | null;
  guestViews: number;
  currentStay?: { id: string; guestName?: string | null; checkInAt: string; checkOutAt: string } | null;
  nextStay?: { id: string; guestName?: string | null; checkInAt: string; checkOutAt: string } | null;
  openRequests: number;
  urgentRequests: number;
  activeServices: number;
  activeJourneys: number;
  grossRevenue: number;
  commissionRevenue: number;
  currency: string;
  attention: string[];
  health: "healthy" | "attention" | "critical";
};

type PortfolioPayload = {
  currentRole: string;
  properties: PropertyRow[];
  summary: {
    properties: number;
    activeStays: number;
    openRequests: number;
    urgentRequests: number;
    grossRevenue: number;
    commissionRevenue: number;
    currency: string;
  };
};

export default function PortfolioPage() {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [organizationId, setOrganizationId] = useState("");
  const [payload, setPayload] = useState<PortfolioPayload | null>(null);
  const [query, setQuery] = useState("");
  const [healthFilter, setHealthFilter] = useState<"all" | "healthy" | "attention" | "critical">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authHeaders = useCallback(async (): Promise<Record<string,string>> => {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadOrganizations = async () => {
      const { data, error } = await supabase
        .from("organization_members")
        .select("organization_id, role, organizations(id,name)")
        .eq("user_id", user.id);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const rows: Organization[] = (data || []).map((row: any) => {
        const organization = Array.isArray(row.organizations) ? row.organizations[0] : row.organizations;
        return {
          id: row.organization_id,
          name: organization?.name || "Maplyo Organization",
          role: row.role,
        };
      });

      setOrganizations(rows);
      if (rows[0]) setOrganizationId(rows[0].id);
      if (!rows.length) setLoading(false);
    };

    loadOrganizations();
  }, [user]);

  const loadPortfolio = useCallback(async () => {
    if (!organizationId) return;
    setLoading(true);
    setError(null);

    try {
      const headers = await authHeaders();
      const res = await fetch("/api/portfolio?organizationId=" + encodeURIComponent(organizationId), { headers });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not load portfolio");
      setPayload(body);
    } catch (error: any) {
      setError(error?.message || "Could not load portfolio");
    } finally {
      setLoading(false);
    }
  }, [organizationId, authHeaders]);

  useEffect(() => {
    if (organizationId) loadPortfolio();
  }, [organizationId, loadPortfolio]);

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return (payload?.properties || []).filter((property) => {
      if (healthFilter !== "all" && property.health !== healthFilter) return false;
      if (!normalized) return true;
      return [property.name, property.city, property.propertyType]
        .some((value) => String(value || "").toLowerCase().includes(normalized));
    });
  }, [payload, query, healthFilter]);

  const healthDot = (health: PropertyRow["health"]) =>
    health === "healthy" ? "bg-emerald-400" : health === "critical" ? "bg-red-400" : "bg-amber-300";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to operations
        </Link>

        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Portfolio</div>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">Command Center</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Operate dozens of properties from one screen: stays, guest issues, engagement, revenue and automation health.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {organizations.length > 0 && (
              <select
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                className="h-11 rounded-xl border border-white/10 bg-slate-900 px-4 text-sm"
              >
                {organizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>{organization.name}</option>
                ))}
              </select>
            )}
            <button onClick={loadPortfolio} className="rounded-xl border border-white/10 p-3 text-zinc-400 hover:bg-white/5 hover:text-white">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">{error}</div>
        )}

        {payload && (
          <>
            <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-6">
              {[
                { label: "Properties", value: payload.summary.properties, icon: Building2 },
                { label: "In stay", value: payload.summary.activeStays, icon: CalendarDays },
                { label: "Open requests", value: payload.summary.openRequests, icon: Activity },
                { label: "Urgent", value: payload.summary.urgentRequests, icon: CircleAlert },
                { label: "30d GMV", value: `${payload.summary.grossRevenue.toFixed(0)} ${payload.summary.currency}`, icon: CircleDollarSign },
                { label: "Maplyo rev.", value: `${payload.summary.commissionRevenue.toFixed(0)} ${payload.summary.currency}`, icon: Sparkles },
              ].map(({ label, value, icon: Icon }) => (
                <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">{label}</span>
                    <Icon className="h-4 w-4 text-orange-300" />
                  </div>
                  <div className="mt-4 text-2xl font-bold">{value}</div>
                </article>
              ))}
            </section>

            <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full max-w-xl">
                  <Search className="absolute left-4 top-3.5 h-4 w-4 text-zinc-600" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search property, city or type…"
                    className="h-11 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm outline-none focus:border-orange-400/40"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {(["all","critical","attention","healthy"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setHealthFilter(filter)}
                      className={`rounded-xl border px-3 py-2 text-xs font-bold capitalize ${healthFilter === filter ? "border-orange-300/40 bg-orange-300/10 text-orange-200" : "border-white/10 text-zinc-500 hover:text-white"}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[1050px] overflow-hidden rounded-2xl border border-white/10">
                  <div className="grid grid-cols-[2fr_1.2fr_.8fr_.8fr_.9fr_.9fr_1fr] gap-3 bg-white/5 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    <div>Property</div>
                    <div>Stay</div>
                    <div>Views</div>
                    <div>Requests</div>
                    <div>Services</div>
                    <div>30d GMV</div>
                    <div>Health</div>
                  </div>

                  <div className="divide-y divide-white/10">
                    {visible.map((property) => (
                      <div key={property.id} className="grid grid-cols-[2fr_1.2fr_.8fr_.8fr_.9fr_.9fr_1fr] gap-3 bg-black/10 px-4 py-4 text-sm hover:bg-white/[0.025]">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${healthDot(property.health)}`} />
                            <span className="truncate font-bold">{property.name}</span>
                          </div>
                          <div className="mt-1 text-xs text-zinc-600">
                            {[property.city, property.propertyType.replaceAll("_"," ")].filter(Boolean).join(" · ")}
                          </div>
                          <div className="mt-2 flex gap-2">
                            {property.guide && (
                              <>
                                <Link href={`/app/guides/${property.guide.id}/builder`} className="text-[10px] font-bold text-zinc-500 hover:text-white">Edit</Link>
                                {property.guide.published && (
                                  <a href={`/g/${property.guide.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-white">
                                    Live <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        <div>
                          {property.currentStay ? (
                            <>
                              <div className="font-bold text-sky-300">In stay</div>
                              <div className="mt-1 text-xs text-zinc-500">{property.currentStay.guestName || "Guest"}</div>
                            </>
                          ) : property.nextStay ? (
                            <>
                              <div className="font-medium">{property.nextStay.guestName || "Guest"}</div>
                              <div className="mt-1 text-xs text-zinc-600">{new Date(property.nextStay.checkInAt).toLocaleDateString()}</div>
                            </>
                          ) : <span className="text-zinc-700">—</span>}
                        </div>

                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-zinc-700" /> {property.guestViews}
                        </div>

                        <div>
                          <span className={property.urgentRequests ? "font-bold text-red-300" : ""}>{property.openRequests}</span>
                          {property.urgentRequests > 0 && <div className="text-[10px] font-bold text-red-300">{property.urgentRequests} urgent</div>}
                        </div>

                        <div>
                          <div>{property.activeServices}</div>
                          <div className="text-[10px] text-zinc-600">{property.activeJourneys} journeys</div>
                        </div>

                        <div>
                          <div className="font-bold">{property.grossRevenue.toFixed(0)} {property.currency}</div>
                          <div className="text-[10px] text-zinc-600">{property.commissionRevenue.toFixed(0)} Maplyo</div>
                        </div>

                        <div>
                          <div className="capitalize font-bold">{property.health}</div>
                          {property.attention.length > 0 && (
                            <div className="mt-1 line-clamp-2 text-[10px] leading-4 text-zinc-600">{property.attention.join(" · ")}</div>
                          )}
                        </div>
                      </div>
                    ))}

                    {!loading && visible.length === 0 && (
                      <div className="p-10 text-center text-sm text-zinc-500">No properties match this view.</div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {loading && !payload && (
          <div className="mt-12 flex justify-center"><RefreshCw className="h-7 w-7 animate-spin text-zinc-500" /></div>
        )}

        {!loading && organizations.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-white/10 p-12 text-center text-zinc-500">
            Portfolio mode becomes available once your hospitality workspace is active.
          </div>
        )}
      </div>
    </main>
  );
}
