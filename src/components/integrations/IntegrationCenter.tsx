"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, CircleAlert, KeyRound, Loader2, RefreshCw, Unplug } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { integrationsCopy } from "@/lib/i18n/integrations";

type Health = "disconnected" | "healthy" | "degraded" | "error";

type AirbnbStatus = {
  connected: boolean;
  health: Health;
  calendar?: string | null;
  lastSyncAt?: string | null;
  reservationCount?: number;
  error?: string | null;
  tuyaDeviceId?: string | null;
  tuyaDeviceName?: string | null;
  tuyaCodeLength?: number;
  propertyName?: string | null;
};

type TuyaDevice = {
  id: string;
  name: string;
  category?: string | null;
  productName?: string | null;
  online?: boolean | null;
};

type TuyaStatus = {
  connected: boolean;
  health: Health;
  accountHint?: string | null;
  region?: string | null;
  devices: TuyaDevice[];
  error?: string | null;
};

export function IntegrationCenter({ guideId }: { guideId: string }) {
  const { lang } = useTranslation();
  const t = integrationsCopy(lang);

  const [airbnb, setAirbnb] = useState<AirbnbStatus>({ connected: false, health: "disconnected" });
  const [tuya, setTuya] = useState<TuyaStatus>({ connected: false, health: "disconnected", devices: [] });
  const [icalUrl, setIcalUrl] = useState("");
  const [accessId, setAccessId] = useState("");
  const [accessSecret, setAccessSecret] = useState("");
  const [region, setRegion] = useState<"eu"|"us"|"cn"|"in">("eu");
  const [deviceId, setDeviceId] = useState("");
  const [codeLength, setCodeLength] = useState<6|7>(6);
  const [editingAirbnb, setEditingAirbnb] = useState(false);
  const [editingLock, setEditingLock] = useState(false);
  const [busy, setBusy] = useState<string | null>("load");
  const [loadFailed, setLoadFailed] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const authHeaders = useCallback(async (): Promise<Record<string, string>> => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const load = useCallback(async () => {
    setBusy("load");
    setMessage(null);
    setLoadFailed(false);

    try {
      const headers = await authHeaders();
      const [airbnbRes, tuyaRes] = await Promise.all([
        fetch("/api/integrations/airbnb?guideId=" + encodeURIComponent(guideId), { headers }),
        fetch("/api/integrations/tuya", { headers }),
      ]);

      const airbnbBody = await airbnbRes.json().catch(() => ({}));
      const tuyaBody = await tuyaRes.json().catch(() => ({}));

      if (!airbnbRes.ok || !tuyaRes.ok) {
        throw new Error(airbnbBody.error || tuyaBody.error || t.messages.failed);
      }

      if (airbnbRes.ok) {
        setAirbnb(airbnbBody);
        setDeviceId(String(airbnbBody.tuyaDeviceId || ""));
        setCodeLength(Number(airbnbBody.tuyaCodeLength) === 7 ? 7 : 6);
      }

      if (tuyaRes.ok) {
        setTuya({ ...tuyaBody, devices: tuyaBody.devices || [] });
        if (tuyaBody.region && ["eu","us","cn","in"].includes(tuyaBody.region)) {
          setRegion(tuyaBody.region);
        }
      }
    } catch (error: any) {
      setLoadFailed(true);
      setMessage({ kind: "error", text: error?.message || t.messages.failed });
    } finally {
      setBusy(null);
    }
  }, [guideId, authHeaders, t.messages.failed]);

  useEffect(() => {
    load();
  }, [load]);

  const healthLabel = (health: Health) =>
    health === "healthy" ? t.healthy :
    health === "degraded" ? t.degraded :
    health === "error" ? t.error :
    t.disconnected;

  const healthClass = (health: Health) =>
    health === "healthy" ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
    health === "degraded" ? "border-amber-200 bg-amber-50 text-amber-700" :
    health === "error" ? "border-red-200 bg-red-50 text-red-700" :
    "border-gray-200 bg-gray-50 text-gray-500";

  const connectAirbnb = async () => {
    if (!icalUrl.trim()) return;
    setBusy("airbnb-connect");
    setMessage(null);

    try {
      const headers = await authHeaders();
      const res = await fetch("/api/integrations/airbnb", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ guideId, icalUrl: icalUrl.trim() }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || t.messages.failed);

      await load();
      setIcalUrl("");
      setEditingAirbnb(false);
      setMessage({ kind: "ok", text: t.messages.connected });
    } catch (error: any) {
      setMessage({ kind: "error", text: error?.message || t.messages.failed });
    } finally {
      setBusy(null);
    }
  };

  const syncAirbnb = async () => {
    setBusy("airbnb-sync");
    setMessage(null);

    try {
      const headers = await authHeaders();
      const res = await fetch("/api/integrations/airbnb/sync", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ guideId }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || t.messages.failed);

      setAirbnb((current) => ({
        ...current,
        connected: true,
        health: "healthy",
        lastSyncAt: body.syncedAt,
        reservationCount: body.reservations,
        error: null,
      }));
      if (body.tuya?.configured && !body.tuya.healthy) {
        setTuya((current) => ({ ...current, health: "degraded", error: body.tuya.error || t.messages.failed }));
        setMessage({ kind: "error", text: `${t.messages.synced} ${body.tuya.error || t.messages.failed}` });
      } else {
        setMessage({ kind: "ok", text: `${t.messages.synced} ${body.reservations ?? 0} ${t.airbnb.reservations}.` });
      }
    } catch (error: any) {
      setAirbnb((current) => ({ ...current, health: "error", error: error?.message || t.messages.failed }));
      setMessage({ kind: "error", text: error?.message || t.messages.failed });
    } finally {
      setBusy(null);
    }
  };

  const disconnectAirbnb = async () => {
    setBusy("airbnb-disconnect");
    try {
      const headers = await authHeaders();
      const res = await fetch("/api/integrations/airbnb?guideId=" + encodeURIComponent(guideId), {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error(t.messages.failed);
      setAirbnb((current) => ({ ...current, connected: false, health: "disconnected", calendar: null, lastSyncAt: null, reservationCount: 0, error: null }));
      setIcalUrl("");
      setEditingAirbnb(false);
    } catch (error: any) {
      setMessage({ kind: "error", text: error?.message || t.messages.failed });
    } finally {
      setBusy(null);
    }
  };

  const connectTuya = async () => {
    if (!accessId.trim() || !accessSecret.trim()) return;
    setBusy("tuya-connect");
    setMessage(null);

    try {
      const headers = await authHeaders();
      const res = await fetch("/api/integrations/tuya", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          accessId: accessId.trim(),
          accessSecret: accessSecret.trim(),
          region,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || t.messages.failed);

      setAccessId("");
      setAccessSecret("");
      await load();
      const devices = Array.isArray(body.devices) ? body.devices : [];
      setMessage({
        kind: devices.length ? "ok" : "error",
        text: devices.length ? t.messages.connected : t.tuya.noDevices,
      });
    } catch (error: any) {
      setMessage({ kind: "error", text: error?.message || t.messages.failed });
    } finally {
      setBusy(null);
    }
  };

  const assignDevice = async () => {
    if (!deviceId) return;
    setBusy("tuya-device");
    setMessage(null);

    try {
      const headers = await authHeaders();
      const res = await fetch("/api/integrations/tuya", {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ guideId, deviceId, codeLength }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || t.messages.failed);

      await load();
      setEditingLock(false);
      setMessage({ kind: "ok", text: t.messages.deviceSaved });
    } catch (error: any) {
      setMessage({ kind: "error", text: error?.message || t.messages.failed });
    } finally {
      setBusy(null);
    }
  };

  const disconnectTuya = async () => {
    setBusy("tuya-disconnect");
    try {
      const headers = await authHeaders();
      const res = await fetch("/api/integrations/tuya?guideId=" + encodeURIComponent(guideId), { method: "DELETE", headers });
      if (!res.ok) throw new Error(t.messages.failed);
      setDeviceId("");
      setCodeLength(6);
      setEditingLock(false);
      await load();
    } catch (error: any) {
      setMessage({ kind: "error", text: error?.message || t.messages.failed });
    } finally {
      setBusy(null);
    }
  };

  const selectedDevice = useMemo(
    () => tuya.devices.find((device) => device.id === deviceId),
    [tuya.devices, deviceId]
  );

  return (
    <div className="space-y-5 p-1">
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
        <h3 className="font-bold text-slate-900">{t.title}</h3>
        <p className="mt-1 text-xs leading-5 text-indigo-700">{t.subtitle}</p>
        {airbnb.propertyName && <p className="mt-2 text-sm font-bold text-slate-900">{airbnb.propertyName}</p>}
        <button onClick={() => load()} disabled={Boolean(busy)} aria-label={t.loading} className="mt-3 rounded-lg border border-indigo-200 p-2 text-indigo-700 disabled:opacity-40">
          <RefreshCw className={`h-4 w-4 ${busy === "load" ? "animate-spin" : ""}`} />
        </button>
      </div>

      {message && (
        <div className={`rounded-xl border px-4 py-3 text-xs font-medium ${message.kind === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      )}

      <fieldset disabled={loadFailed || Boolean(busy)} className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><CalendarDays className="h-5 w-5" /></div>
            <div>
              <h4 className="font-bold text-gray-900">{t.airbnb.title}</h4>
              <p className="mt-1 text-xs leading-5 text-gray-500">{t.airbnb.desc}</p>
            </div>
          </div>
          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold ${healthClass(airbnb.health)}`}>
            {healthLabel(airbnb.health)}
          </span>
        </div>

        {!airbnb.connected || editingAirbnb ? (
          <div className="mt-5 space-y-3">
            {airbnb.connected && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-4 w-4" />
                  {t.airbnb.savedFor} {airbnb.propertyName || "Maplyo"}
                </div>
                {airbnb.calendar && <div className="mt-1 truncate text-[11px] text-emerald-700">{airbnb.calendar}</div>}
              </div>
            )}
            <div className="flex items-center justify-between gap-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">{t.airbnb.url}</label>
              {airbnb.connected && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAirbnb(false);
                    setIcalUrl("");
                  }}
                  className="text-xs font-bold text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>
              )}
            </div>
            <input
              value={icalUrl}
              onChange={(e) => setIcalUrl(e.target.value)}
              placeholder="https://www.airbnb.com/calendar/ical/...ics"
              className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-rose-400"
            />
            <p className="text-[11px] leading-5 text-gray-400">{t.airbnb.helper}</p>
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-[11px] leading-5 text-rose-700">{t.airbnb.autoSync}</p>
            <button
              onClick={connectAirbnb}
              disabled={!icalUrl.trim() || Boolean(busy)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-rose-600 text-sm font-bold text-white disabled:opacity-40"
            >
              {busy === "airbnb-connect" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {t.airbnb.connect}
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    {t.airbnb.savedFor} {airbnb.propertyName || "Maplyo"}
                  </div>
                  {airbnb.calendar && <div className="mt-2 truncate text-[11px] text-emerald-700">{airbnb.calendar}</div>}
                </div>
                <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-bold ${healthClass(airbnb.health)}`}>
                  {healthLabel(airbnb.health)}
                </span>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t.airbnb.reservations}</div>
                <div className="mt-1 text-xl font-bold text-gray-900">{airbnb.reservationCount || 0}</div>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t.airbnb.lastSync}</div>
                <div className="mt-1 text-xs font-bold text-gray-700">{airbnb.lastSyncAt ? new Date(airbnb.lastSyncAt).toLocaleString() : t.airbnb.never}</div>
              </div>
            </div>

            {airbnb.error && <div className="mt-3 text-xs text-red-600">{airbnb.error}</div>}

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <button
                onClick={syncAirbnb}
                disabled={Boolean(busy)}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white disabled:opacity-40"
              >
                {busy === "airbnb-sync" ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                {t.airbnb.sync}
              </button>
              <button
                type="button"
                onClick={() => setEditingAirbnb(true)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                {t.airbnb.change}
              </button>
              <button
                type="button"
                onClick={disconnectAirbnb}
                disabled={Boolean(busy)}
                className="rounded-xl border border-red-100 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-40"
              >
                {t.airbnb.remove}
              </button>
            </div>
          </div>
        )}
      </fieldset>

      <fieldset disabled={loadFailed || Boolean(busy)} className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><KeyRound className="h-5 w-5" /></div>
            <div>
              <h4 className="font-bold text-gray-900">{t.tuya.title}</h4>
              <p className="mt-1 text-xs leading-5 text-gray-500">{t.tuya.desc}</p>
            </div>
          </div>
          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold ${healthClass(tuya.health)}`}>
            {healthLabel(tuya.health)}
          </span>
        </div>

        {!tuya.connected ? (
          <div className="mt-5 space-y-3">
            <input value={accessId} onChange={(e) => setAccessId(e.target.value)} placeholder={t.tuya.accessId} className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-indigo-400" />
            <input type="password" value={accessSecret} onChange={(e) => setAccessSecret(e.target.value)} placeholder={t.tuya.accessSecret} className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-indigo-400" />
            <select value={region} onChange={(e) => setRegion(e.target.value as any)} className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm">
              <option value="eu">Europe</option>
              <option value="us">United States</option>
              <option value="cn">China</option>
              <option value="in">India</option>
            </select>
            <button onClick={connectTuya} disabled={!accessId.trim() || !accessSecret.trim() || Boolean(busy)} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white disabled:opacity-40">
              {busy === "tuya-connect" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {t.tuya.connect}
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3">
              <div className="text-[10px] font-black uppercase tracking-wider text-indigo-500">{t.tuya.globalAccount}</div>
              <div className="mt-1 text-sm font-bold text-indigo-900">
                ••••{tuya.accountHint || "—"} · {String(tuya.region || region).toUpperCase()}
              </div>
            </div>

            {airbnb.tuyaDeviceId && !editingLock ? (
              <div className="mt-4">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                        <KeyRound className="h-4 w-4" />
                        {t.tuya.assignedFor} {airbnb.propertyName || "Maplyo"}
                      </div>
                      <div className="mt-2 text-sm font-black text-emerald-950">
                        {airbnb.tuyaDeviceName || airbnb.tuyaDeviceId}
                      </div>
                      <div className="mt-1 text-[11px] text-emerald-700">
                        {airbnb.tuyaCodeLength || 6} digits
                      </div>
                    </div>
                    <span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${healthClass(tuya.health)}`}>
                      {healthLabel(tuya.health)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setEditingLock(true)}
                    className="rounded-xl border border-gray-200 px-4 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50"
                  >
                    {t.tuya.changeLock}
                  </button>
                  <button
                    type="button"
                    onClick={disconnectTuya}
                    disabled={Boolean(busy)}
                    className="rounded-xl border border-red-100 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-40"
                  >
                    {t.tuya.unassignLock}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex items-center justify-between gap-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">{t.tuya.device}</label>
                  {airbnb.tuyaDeviceId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingLock(false);
                        setDeviceId(String(airbnb.tuyaDeviceId || ""));
                        setCodeLength(Number(airbnb.tuyaCodeLength) === 7 ? 7 : 6);
                      }}
                      className="text-xs font-bold text-gray-400 hover:text-gray-700"
                    >
                      ×
                    </button>
                  )}
                </div>

                {tuya.devices.length === 0 && (
                  <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                    {t.tuya.noDevices}
                  </div>
                )}

                <select value={deviceId} onChange={(e) => setDeviceId(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm">
                  <option value="">{t.tuya.chooseDevice}</option>
                  {airbnb.tuyaDeviceId && !tuya.devices.some((device) => device.id === airbnb.tuyaDeviceId) && (
                    <option value={airbnb.tuyaDeviceId}>{airbnb.tuyaDeviceName || airbnb.tuyaDeviceId}</option>
                  )}
                  {tuya.devices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.name} {device.online === false ? "· offline" : ""}
                    </option>
                  ))}
                </select>

                {selectedDevice && (
                  <div className="mt-2 text-[11px] text-gray-400">
                    {[selectedDevice.productName, selectedDevice.category, selectedDevice.online === false ? "offline" : selectedDevice.online === true ? "online" : null].filter(Boolean).join(" · ")}
                  </div>
                )}

                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">{t.tuya.codeLength}</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {[6,7].map((length) => (
                      <button
                        key={length}
                        type="button"
                        onClick={() => setCodeLength(length as 6|7)}
                        className={`rounded-xl border px-4 py-2 text-sm font-bold ${codeLength === length ? "border-indigo-400 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-500"}`}
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-gray-400">{t.tuya.helper}</p>
                </div>

                <button
                  onClick={assignDevice}
                  disabled={!deviceId || Boolean(busy)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white disabled:opacity-40"
                >
                  {busy === "tuya-device" ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                  {t.tuya.saveDevice}
                </button>
              </div>
            )}
          </div>
        )}

        {tuya.error && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-600">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" /> {tuya.error}
          </div>
        )}
      </fieldset>

      {busy === "load" && (
        <div className="flex items-center justify-center gap-2 py-3 text-xs text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" /> {t.loading}
        </div>
      )}
    </div>
  );
}
