"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleAlert, Clock3, Filter, MessageSquareText, Wrench, CheckCircle2, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

type GuestRequest = {
  id: string;
  property_id: string;
  category: string;
  priority: string;
  status: string;
  title: string;
  message?: string | null;
  guest_name?: string | null;
  guest_email?: string | null;
  guest_phone?: string | null;
  created_at: string;
  properties?: { name?: string | null } | Array<{ name?: string | null }> | null;
};

const statusLabel: Record<string, string> = {
  new: "New",
  acknowledged: "Acknowledged",
  in_progress: "In progress",
  resolved: "Resolved",
  closed: "Closed",
  cancelled: "Cancelled",
};

const priorityWeight: Record<string, number> = {
  urgent: 4,
  high: 3,
  normal: 2,
  low: 1,
};

function propertyName(row: GuestRequest) {
  if (Array.isArray(row.properties)) return row.properties[0]?.name || "Property";
  return row.properties?.name || "Property";
}

export default function GuestRequestsPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<GuestRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("active");
  const [query, setQuery] = useState("");
  const [coreActive, setCoreActive] = useState(true);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);

      const guides = await supabase
        .from("guides")
        .select("property_id")
        .eq("user_id", user.id)
        .not("property_id", "is", null);

      const propertyIds = [...new Set((guides.data || []).map((item: any) => item.property_id).filter(Boolean))];

      if (!propertyIds.length) {
        setRows([]);
        setCoreActive(false);
        setLoading(false);
        return;
      }

      const result = await supabase
        .from("guest_requests")
        .select("id, property_id, category, priority, status, title, message, guest_name, guest_email, guest_phone, created_at, properties(name)")
        .in("property_id", propertyIds)
        .order("created_at", { ascending: false })
        .limit(500);

      if (result.error) {
        setCoreActive(false);
        setRows([]);
      } else {
        setCoreActive(true);
        setRows((result.data || []) as GuestRequest[]);
      }

      setLoading(false);
    };

    load();
  }, [user]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return rows
      .filter((row) => {
        if (statusFilter === "active") return ["new", "acknowledged", "in_progress"].includes(row.status);
        if (statusFilter === "resolved") return ["resolved", "closed"].includes(row.status);
        if (statusFilter === "all") return true;
        return row.status === statusFilter;
      })
      .filter((row) => {
        if (!normalized) return true;
        return [
          row.title,
          row.message,
          row.guest_name,
          row.guest_email,
          row.guest_phone,
          propertyName(row),
          row.category,
        ].some((value) => String(value || "").toLowerCase().includes(normalized));
      })
      .sort((a, b) => {
        const p = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        if (p !== 0) return p;
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
  }, [rows, statusFilter, query]);

  const updateStatus = async (requestId: string, status: "acknowledged" | "in_progress" | "resolved" | "closed" | "cancelled") => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) return;

      const res = await fetch("/api/requests/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId, status }),
      });

      if (!res.ok) return;

      setRows((current) => current.map((row) => row.id === requestId ? { ...row, status } : row));
    } catch (error) {
      console.error("Guest request update failed", error);
    }
  };

  const activeCount = rows.filter((row) => ["new", "acknowledged", "in_progress"].includes(row.status)).length;
  const urgentCount = rows.filter((row) => row.priority === "urgent" && ["new", "acknowledged", "in_progress"].includes(row.status)).length;
  const resolvedCount = rows.filter((row) => row.status === "resolved").length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to operations
        </Link>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">Guest Operations</div>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">Requests Center</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              One operational inbox for housekeeping, maintenance, questions, complaints and guest assistance.
            </p>
          </div>
          <Link href="/dashboard/revenue" className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold hover:bg-white/10">
            Revenue Center
          </Link>
        </div>

        {!coreActive && !loading && (
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-100">
            Guest Operations becomes active after the hospitality migrations are applied.
          </div>
        )}

        <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Active", value: activeCount, icon: MessageSquareText, hint: "Open guest requests" },
            { label: "Urgent", value: urgentCount, icon: CircleAlert, hint: "Needs immediate attention" },
            { label: "Resolved", value: resolvedCount, icon: CheckCircle2, hint: "Completed requests" },
            { label: "Total", value: rows.length, icon: Wrench, hint: "All requests recorded" },
          ].map(({ label, value, icon: Icon, hint }) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</span>
                <Icon className="h-5 w-5 text-purple-300" />
              </div>
              <div className="mt-5 text-3xl font-bold">{loading ? "…" : value}</div>
              <div className="mt-1 text-xs text-zinc-600">{hint}</div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-zinc-600" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guest, property or request…"
                className="h-11 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm outline-none focus:border-purple-400/40"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-11 rounded-xl border border-white/10 bg-slate-900 px-3 text-sm"
              >
                <option value="active">Active</option>
                <option value="new">New</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="in_progress">In progress</option>
                <option value="resolved">Resolved / closed</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {!loading && filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-zinc-500">
                No requests in this view.
              </div>
            ) : filtered.map((row) => (
              <article key={row.id} className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${row.priority === "urgent" ? "bg-red-500/15 text-red-300" : row.priority === "high" ? "bg-amber-400/10 text-amber-300" : "bg-white/5 text-zinc-400"}`}>
                        {row.priority}
                      </span>
                      <span className="rounded-full bg-purple-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                        {row.category.replaceAll("_", " ")}
                      </span>
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        {statusLabel[row.status] || row.status}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold">{row.title}</h3>
                    {row.message && <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{row.message}</p>}

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-600">
                      <span>{propertyName(row)}</span>
                      <span>{row.guest_name || "Guest"}</span>
                      <span>{row.guest_email || row.guest_phone || "No contact"}</span>
                      <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {new Date(row.created_at).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                    {row.status === "new" && (
                      <button onClick={() => updateStatus(row.id, "acknowledged")} className="rounded-xl bg-purple-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-purple-300">
                        Acknowledge
                      </button>
                    )}
                    {["new", "acknowledged"].includes(row.status) && (
                      <button onClick={() => updateStatus(row.id, "in_progress")} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold hover:bg-white/5">
                        Start
                      </button>
                    )}
                    {["acknowledged", "in_progress"].includes(row.status) && (
                      <button onClick={() => updateStatus(row.id, "resolved")} className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-300">
                        Resolve
                      </button>
                    )}
                    {["resolved"].includes(row.status) && (
                      <button onClick={() => updateStatus(row.id, "closed")} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold hover:bg-white/5">
                        Close
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
