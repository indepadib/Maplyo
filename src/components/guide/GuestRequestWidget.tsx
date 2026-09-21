"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X, Send, CheckCircle2 } from "lucide-react";

const categories = [
  ["housekeeping", "Housekeeping"],
  ["maintenance", "Maintenance"],
  ["information", "Information"],
  ["complaint", "Problem / complaint"],
  ["lost_found", "Lost & found"],
  ["transport", "Transport"],
  ["food_beverage", "Food & beverage"],
  ["other", "Other"],
] as const;

export function GuestRequestWidget({ guideId }: { guideId: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    category: "information",
    priority: "normal",
    title: "",
    message: "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
  });

  useEffect(() => {
    const openFromEscalation = (event: Event) => {
      const custom = event as CustomEvent<{
        category?: string;
        title?: string;
        message?: string;
      }>;

      setForm((current) => ({
        ...current,
        category: custom.detail?.category || current.category,
        title: custom.detail?.title || current.title,
        message: custom.detail?.message || current.message,
      }));
      setSent(false);
      setOpen(true);
    };

    window.addEventListener("maplyo:open-support", openFromEscalation as EventListener);
    return () => window.removeEventListener("maplyo:open-support", openFromEscalation as EventListener);
  }, []);

  const submit = async () => {
    if (!form.title || !form.guestName || (!form.guestEmail && !form.guestPhone)) return;
    setSending(true);
    try {
      const res = await fetch("/api/requests/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guideId, ...form }),
      });
      if (res.ok) setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-[95] flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-slate-950 shadow-2xl ring-1 ring-black/5 md:bottom-10 md:right-28"
      >
        <MessageCircle className="h-4 w-4" /> Need help?
      </button>

      {open && (
        <div className="fixed inset-0 z-[140] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm md:items-center md:p-5">
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[28px] bg-white p-6 text-slate-950 shadow-2xl md:rounded-[28px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-600">Guest support</div>
                <h3 className="mt-2 text-2xl font-bold">How can we help?</h3>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            {sent ? (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                <h4 className="mt-3 font-bold text-emerald-900">Request sent</h4>
                <p className="mt-2 text-sm leading-6 text-emerald-700">The property team can now see and process your request.</p>
                <button onClick={() => { setOpen(false); setSent(false); }} className="mt-5 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white">Done</button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="h-12 w-full rounded-xl border border-slate-200 px-3">
                    {categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">What do you need?</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-12 w-full rounded-xl border border-slate-200 px-4" placeholder="e.g. Extra towels" />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Details</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="min-h-24 w-full rounded-xl border border-slate-200 p-4" placeholder="Tell the property team what happened or what you need…" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <input value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} className="h-12 rounded-xl border border-slate-200 px-4" placeholder="Your name" />
                  <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="h-12 rounded-xl border border-slate-200 px-3">
                    <option value="normal">Normal</option>
                    <option value="high">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <input type="email" value={form.guestEmail} onChange={(e) => setForm({ ...form, guestEmail: e.target.value })} className="h-12 rounded-xl border border-slate-200 px-4" placeholder="Email" />
                  <input value={form.guestPhone} onChange={(e) => setForm({ ...form, guestPhone: e.target.value })} className="h-12 rounded-xl border border-slate-200 px-4" placeholder="Phone" />
                </div>

                <button
                  onClick={submit}
                  disabled={sending || !form.title || !form.guestName || (!form.guestEmail && !form.guestPhone)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 font-bold text-white disabled:opacity-40"
                >
                  <Send className="h-4 w-4" /> {sending ? "Sending…" : "Send request"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
