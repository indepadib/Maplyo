import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { VisibilityRule } from "@/types/blocks";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/components/providers/LanguageProvider";

export function AccessCodesTraveler({
  title, data, ctx, visibility,
}: {
  title?: string;
  data: any;
  ctx: { unlocked: boolean };
  visibility?: VisibilityRule;
}) {
  const { t } = useTranslation();
  const [localUnlock, setLocalUnlock] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  // Effective unlock: either Global (ctx.unlocked) OR Local (localUnlock)
  const mode = visibility?.mode ?? "always";
  const isLocked = mode === "with_code" && !ctx.unlocked && !localUnlock;

  const handleUnlock = () => {
    if (code === visibility?.unlockCode) {
      setLocalUnlock(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const apt = data?.apartmentDoorCode ? String(data.apartmentDoorCode) : "";
  const building = data?.buildingDoorCode ? String(data.buildingDoorCode) : "";
  const gate = data?.gateCode ? String(data.gateCode) : "";
  const notes = data?.notes ? String(data.notes) : "";

  return (
    <Card>
      <CardHeader><CardTitle>{title ?? t.guide.accessCode}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {isLocked ? (
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-3 text-gray-500">
              <Lock size={20} />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-4">{t.guide.locked}</p>

            <div className="flex w-full max-w-xs gap-2">
              <input
                type="text"
                placeholder={t.guide.enterCode}
                className={`flex-1 px-3 py-2 text-sm border rounded-lg outline-none transition-all ${error ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}`}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              />
              <Button onClick={handleUnlock} size="sm" variant={error ? "secondary" : "primary"}>
                {error ? <XIcon className="w-4 h-4" /> : "OK"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-2 text-sm animate-in fade-in zoom-in-95 duration-300">
            {apt ? <div><span className="font-medium">{t.guide.apartmentDoor}</span> {apt}</div> : null}
            {building ? <div><span className="font-medium">{t.guide.buildingDoor}</span> {building}</div> : null}
            {gate ? <div><span className="font-medium">{t.guide.gate}</span> {gate}</div> : null}
            {!apt && !building && !gate ? <div className="text-zinc-500">—</div> : null}
          </div>
        )}
        {(notes && !isLocked) ? <div className="text-sm text-zinc-600 border-t pt-2 mt-2">{notes}</div> : null}
      </CardContent>
    </Card>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
  )
}
