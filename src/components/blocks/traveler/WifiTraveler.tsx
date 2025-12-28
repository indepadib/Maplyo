import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

function wifiQrString(ssid: string, pass: string) {
  return `WIFI:T:WPA;S:${ssid};P:${pass};;`;
}

export function WifiTraveler({ title, data, ctx }: { title?: string; data: any; ctx: any; visibility?: any }) {
  const ssid = String(data?.networkName ?? "");
  const pass = String(data?.password ?? "");
  const notes = data?.notes ? String(data.notes) : "";
  const isEn = ctx?.lang === 'en';

  return (
    <Card>
      <CardHeader><CardTitle>{title ?? "Wi‑Fi"}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2 text-sm">
          <div><span className="font-medium">{isEn ? "Network:" : "Réseau :"}</span> {ssid || "—"}</div>
          <div><span className="font-medium">{isEn ? "Password:" : "Mot de passe :"}</span> {pass || "—"}</div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-700">
          <div className="font-medium text-zinc-900 mb-1">{isEn ? "Scan to join" : "Scanner pour rejoindre"}</div>
          <div className="break-all font-mono opacity-80">{ssid && pass ? wifiQrString(ssid, pass) : "—"}</div>
        </div>

        {notes ? <div className="text-sm text-zinc-600">{notes}</div> : null}
      </CardContent>
    </Card>
  );
}
