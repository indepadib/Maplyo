import { Card, CardContent } from "@/components/ui/Card";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { QRCodeSVG } from "qrcode.react";

function wifiQrString(ssid: string, pass: string) {
  return `WIFI:T:WPA;S:${ssid};P:${pass};;`;
}

export function WifiTraveler({ title, data, ctx }: { title?: string; data: any; ctx: any; visibility?: any }) {
  const ssid = String(data?.networkName ?? "");
  const pass = String(data?.password ?? "");
  const notes = data?.notes ? String(data.notes) : "";
  const { t } = useTranslation();
  const tw = t?.guideBlocks?.wifi || {
    network: "Réseau",
    password: "Mot de passe",
    scan: "Scannez pour vous connecter"
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="space-y-6 px-0">
        <div className="grid gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{tw.network}</span>
            <span className="text-sm font-bold text-zinc-900">{ssid || "—"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{tw.password}</span>
            <span className="text-sm font-mono font-bold text-zinc-900">{pass || "—"}</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-[32px] border border-zinc-100 shadow-xl shadow-zinc-200/50">
          {ssid && pass ? (
            <>
              <div className="p-4 bg-white rounded-2xl shadow-inner border border-zinc-50 ring-1 ring-zinc-100">
                <QRCodeSVG 
                  value={wifiQrString(ssid, pass)} 
                  size={200}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm font-bold text-zinc-900 mb-1">{tw.scan}</p>
                <p className="text-xs text-zinc-500">Automatique et sécurisé</p>
              </div>
            </>
          ) : (
            <div className="text-zinc-400 italic text-sm">Configurez le WiFi pour générer le QR Code</div>
          )}
        </div>

        {notes ? (
          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <p className="text-sm text-blue-700 leading-relaxed italic">{notes}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
