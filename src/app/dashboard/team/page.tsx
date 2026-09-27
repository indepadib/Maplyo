"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Crown,
  Loader2,
  MailPlus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  UserCog,
  UsersRound,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

type Organization = {
  id: string;
  name: string;
  role: "owner" | "admin" | "manager" | "member" | "viewer";
};

type Member = {
  user_id: string;
  role: Organization["role"];
  created_at: string;
  profile?: {
    id: string;
    email?: string | null;
    full_name?: string | null;
    avatar_url?: string | null;
  } | null;
};

type Invitation = {
  id: string;
  email: string;
  role: "admin" | "manager" | "member" | "viewer";
  expires_at: string;
  created_at: string;
};

const roleCopy: Record<Organization["role"], { title: string; text: string }> = {
  owner: { title: "Owner", text: "Full control, billing, team and admin roles." },
  admin: { title: "Admin", text: "Organization settings, team, operations and commercial modules." },
  manager: { title: "Manager", text: "Properties, services, stays, requests and revenue operations." },
  member: { title: "Member", text: "Day-to-day guest and stay operations." },
  viewer: { title: "Viewer", text: "Read-only visibility across the organization." },
};

export default function TeamPage() {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [organizationId, setOrganizationId] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [currentRole, setCurrentRole] = useState<Organization["role"] | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "manager" | "member" | "viewer">("member");
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const authHeaders = useCallback(async (): Promise<Record<string, string>> => {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadOrganizations = async () => {
      const { data: memberships, error } = await supabase
        .from("organization_members")
        .select("organization_id, role, organizations(id,name)")
        .eq("user_id", user.id);

      if (error) {
        setLoading(false);
        return;
      }

      const rows: Organization[] = (memberships || []).map((row: any) => {
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

  const loadTeam = useCallback(async () => {
    if (!organizationId) return;
    setLoading(true);
    setMessage(null);

    try {
      const headers = await authHeaders();
      const res = await fetch("/api/team?organizationId=" + encodeURIComponent(organizationId), { headers });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not load team");

      setMembers(body.members || []);
      setInvitations(body.invitations || []);
      setCurrentRole(body.currentRole || null);
    } catch (error: any) {
      setMessage({ type: "error", text: error?.message || "Could not load team" });
    } finally {
      setLoading(false);
    }
  }, [organizationId, authHeaders]);

  useEffect(() => {
    if (organizationId) loadTeam();
  }, [organizationId, loadTeam]);

  const currentOrganization = organizations.find((item) => item.id === organizationId);
  const canManage = currentRole === "owner" || currentRole === "admin";

  const invite = async () => {
    if (!organizationId || !inviteEmail.trim() || !canManage) return;
    setInviting(true);
    setMessage(null);

    try {
      const headers = await authHeaders();
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          organizationId,
          email: inviteEmail.trim(),
          role: inviteRole,
        }),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not send invitation");

      setInviteEmail("");
      setMessage({
        type: "success",
        text: body.addedExistingUser
          ? "Existing Maplyo user added to the team."
          : "Invitation sent. It expires in 7 days.",
      });
      await loadTeam();
    } catch (error: any) {
      setMessage({ type: "error", text: error?.message || "Could not send invitation" });
    } finally {
      setInviting(false);
    }
  };

  const changeRole = async (member: Member, role: "admin" | "manager" | "member" | "viewer") => {
    if (!canManage || member.role === "owner") return;
    setMessage(null);

    const previous = member.role;
    setMembers((rows) => rows.map((row) => row.user_id === member.user_id ? { ...row, role } : row));

    try {
      const headers = await authHeaders();
      const res = await fetch("/api/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ organizationId, userId: member.user_id, role }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not update role");
    } catch (error: any) {
      setMembers((rows) => rows.map((row) => row.user_id === member.user_id ? { ...row, role: previous } : row));
      setMessage({ type: "error", text: error?.message || "Could not update role" });
    }
  };

  const removeMember = async (member: Member) => {
    if (!canManage || member.role === "owner") return;
    if (!window.confirm("Remove this person from the organization?")) return;

    try {
      const headers = await authHeaders();
      const res = await fetch("/api/team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ organizationId, userId: member.user_id }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not remove member");
      setMembers((rows) => rows.filter((row) => row.user_id !== member.user_id));
    } catch (error: any) {
      setMessage({ type: "error", text: error?.message || "Could not remove member" });
    }
  };

  const stats = useMemo(() => ({
    total: members.length,
    managers: members.filter((member) => ["owner","admin","manager"].includes(member.role)).length,
    operators: members.filter((member) => member.role === "member").length,
    viewers: members.filter((member) => member.role === "viewer").length,
  }), [members]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to operations
        </Link>

        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">Organization</div>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">Team & Roles</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Give every hotel, riad or property-management team the access they need — and nothing they do not.
            </p>
          </div>

          {organizations.length > 0 && (
            <select
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              className="h-11 rounded-xl border border-white/10 bg-slate-900 px-4 text-sm"
            >
              {organizations.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {message && (
          <div className={`mt-6 rounded-2xl border p-4 text-sm ${message.type === "success" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" : "border-red-400/20 bg-red-400/10 text-red-200"}`}>
            {message.text}
          </div>
        )}

        {organizations.length === 0 && !loading ? (
          <div className="mt-10 rounded-3xl border border-dashed border-white/10 p-12 text-center text-zinc-500">
            Team management becomes available once your Maplyo hospitality workspace is active.
          </div>
        ) : (
          <>
            <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "Team members", value: stats.total, icon: UsersRound },
                { label: "Managers", value: stats.managers, icon: ShieldCheck },
                { label: "Operators", value: stats.operators, icon: UserCog },
                { label: "Viewers", value: stats.viewers, icon: CheckCircle2 },
              ].map(({ label, value, icon: Icon }) => (
                <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</span>
                    <Icon className="h-5 w-5 text-indigo-300" />
                  </div>
                  <div className="mt-5 text-3xl font-bold">{loading ? "…" : value}</div>
                </article>
              ))}
            </section>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
              <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">{currentOrganization?.name || "Team"}</h2>
                    <p className="mt-1 text-sm text-zinc-500">Your role: {currentRole || "—"}</p>
                  </div>
                  <button onClick={loadTeam} className="rounded-xl border border-white/10 p-2 text-zinc-500 hover:text-white">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
                  {members.map((member) => {
                    const displayName = member.profile?.full_name || member.profile?.email || "Team member";
                    const isOwner = member.role === "owner";
                    const roleOptions = currentRole === "owner"
                      ? ["admin","manager","member","viewer"]
                      : ["manager","member","viewer"];

                    return (
                      <div key={member.user_id} className="flex flex-col gap-4 bg-black/10 p-4 md:flex-row md:items-center md:justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            {isOwner && <Crown className="h-4 w-4 text-amber-300" />}
                            <div className="truncate font-bold">{displayName}</div>
                          </div>
                          {member.profile?.email && member.profile?.full_name && (
                            <div className="mt-1 truncate text-xs text-zinc-600">{member.profile.email}</div>
                          )}
                          <div className="mt-2 text-xs text-zinc-500">{roleCopy[member.role].text}</div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {isOwner ? (
                            <span className="rounded-xl bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-300">Owner</span>
                          ) : canManage ? (
                            <>
                              <select
                                value={member.role}
                                onChange={(e) => changeRole(member, e.target.value as any)}
                                className="h-10 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs font-bold"
                              >
                                {roleOptions.map((role) => <option key={role} value={role}>{roleCopy[role as Organization["role"]].title}</option>)}
                              </select>
                              <button
                                onClick={() => removeMember(member)}
                                className="rounded-xl border border-red-400/15 p-2.5 text-red-300 hover:bg-red-400/10"
                                title="Remove member"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <span className="rounded-xl bg-white/5 px-3 py-2 text-xs font-bold text-zinc-400">{roleCopy[member.role].title}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {!loading && members.length === 0 && (
                    <div className="p-8 text-center text-sm text-zinc-500">No team members found.</div>
                  )}
                </div>

                {canManage && invitations.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Pending invitations</h3>
                    <div className="mt-3 space-y-2">
                      {invitations.map((invitation) => (
                        <div key={invitation.id} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/10 p-3">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-bold">{invitation.email}</div>
                            <div className="mt-1 text-xs text-zinc-600">
                              {invitation.role} · expires {new Date(invitation.expires_at).toLocaleDateString()}
                            </div>
                          </div>
                          <MailPlus className="h-4 w-4 shrink-0 text-indigo-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              <aside className="space-y-5">
                {canManage && (
                  <section className="rounded-3xl border border-indigo-400/15 bg-indigo-400/5 p-6">
                    <MailPlus className="h-6 w-6 text-indigo-300" />
                    <h2 className="mt-4 text-xl font-bold">Invite teammate</h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">Existing Maplyo users are added immediately. New users receive a secure 7-day invitation.</p>

                    <div className="mt-5 space-y-3">
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="colleague@hotel.com"
                        className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm outline-none focus:border-indigo-400/50"
                      />
                      <select
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value as any)}
                        className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm"
                      >
                        {currentRole === "owner" && <option value="admin">Admin</option>}
                        <option value="manager">Manager</option>
                        <option value="member">Member</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      <button
                        onClick={invite}
                        disabled={inviting || !inviteEmail.trim()}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-300 font-bold text-slate-950 hover:bg-indigo-200 disabled:opacity-40"
                      >
                        {inviting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MailPlus className="h-4 w-4" />}
                        {inviting ? "Inviting…" : "Send invitation"}
                      </button>
                    </div>
                  </section>
                )}

                <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                  <h2 className="font-bold">Role model</h2>
                  <div className="mt-4 space-y-4">
                    {(["owner","admin","manager","member","viewer"] as const).map((role) => (
                      <div key={role}>
                        <div className="text-sm font-bold">{roleCopy[role].title}</div>
                        <div className="mt-1 text-xs leading-5 text-zinc-500">{roleCopy[role].text}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
