"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, UsersRound } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

export default function AcceptTeamInvitationPage() {
  const { user, loading: authLoading } = useAuth();
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "accepting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [organizationName, setOrganizationName] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setToken(new URLSearchParams(window.location.search).get("token") || "");
  }, []);

  useEffect(() => {
    if (authLoading || !token) return;
    if (!user) return;

    const accept = async () => {
      setStatus("accepting");
      try {
        const session = await supabase.auth.getSession();
        const accessToken = session.data.session?.access_token;
        if (!accessToken) throw new Error("Please sign in first");

        const res = await fetch("/api/team/accept", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ token }),
        });

        const body = await res.json();
        if (!res.ok) throw new Error(body.error || "Could not accept invitation");

        setOrganizationName(body.organizationName || "the team");
        setStatus("success");
      } catch (error: any) {
        setMessage(error?.message || "Could not accept invitation");
        setStatus("error");
      }
    };

    accept();
  }, [authLoading, token, user]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "/team/accept";
  const loginUrl = "/login?next=" + encodeURIComponent(currentUrl);
  const signupUrl = "/signup?next=" + encodeURIComponent(currentUrl);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-5 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-400/10">
          <UsersRound className="h-7 w-7 text-indigo-300" />
        </div>

        {!token ? (
          <>
            <h1 className="mt-6 text-2xl font-bold">Invitation unavailable</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-500">This team invitation link is incomplete.</p>
          </>
        ) : authLoading ? (
          <div className="mt-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-zinc-500" /></div>
        ) : !user ? (
          <>
            <h1 className="mt-6 text-2xl font-bold">Join the Maplyo team</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-500">Sign in with the email address that received this invitation, or create your Maplyo account first.</p>
            <div className="mt-7 grid gap-3">
              <Link href={loginUrl} className="rounded-xl bg-white px-5 py-3 font-bold text-slate-950">Sign in</Link>
              <Link href={signupUrl} className="rounded-xl border border-white/10 px-5 py-3 font-bold">Create account</Link>
            </div>
          </>
        ) : status === "accepting" || status === "idle" ? (
          <>
            <Loader2 className="mx-auto mt-7 h-7 w-7 animate-spin text-indigo-300" />
            <h1 className="mt-5 text-2xl font-bold">Joining your team…</h1>
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle2 className="mx-auto mt-7 h-8 w-8 text-emerald-400" />
            <h1 className="mt-5 text-2xl font-bold">You joined {organizationName}</h1>
            <p className="mt-3 text-sm text-zinc-500">Your role and permissions are now active.</p>
            <Link href="/dashboard" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-slate-950">Open Maplyo</Link>
          </>
        ) : (
          <>
            <h1 className="mt-6 text-2xl font-bold">Could not accept invitation</h1>
            <p className="mt-3 text-sm leading-6 text-red-300">{message}</p>
            <p className="mt-3 text-xs leading-5 text-zinc-600">Make sure you are signed in with the same email address that received the invitation.</p>
          </>
        )}
      </div>
    </main>
  );
}
