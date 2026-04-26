"use client";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useTranslation } from "@/components/providers/LanguageProvider";

export function WifiEditor({ data, onChange }: { title?: string; data: any; onChange: (d: any) => void }) {
  const d = data ?? {};
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">{t.editor.wifi.networkName}</div>
        <Input value={d.networkName ?? ""} onChange={(e) => onChange({ ...d, networkName: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">{t.editor.wifi.password}</div>
        <Input value={d.password ?? ""} onChange={(e) => onChange({ ...d, password: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">{t.editor.wifi.notes}</div>
        <Textarea value={d.notes ?? ""} onChange={(e) => onChange({ ...d, notes: e.target.value })} />
      </div>
    </div>
  );
}
