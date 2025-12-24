"use client";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function WifiEditor({ data, onChange }: { title?: string; data: any; onChange: (d: any) => void }) {
  const d = data ?? {};
  return (
    <div className="space-y-3">
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Nom du réseau</div>
        <Input value={d.networkName ?? ""} onChange={(e) => onChange({ ...d, networkName: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Mot de passe</div>
        <Input value={d.password ?? ""} onChange={(e) => onChange({ ...d, password: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Note (optionnel)</div>
        <Textarea value={d.notes ?? ""} onChange={(e) => onChange({ ...d, notes: e.target.value })} />
      </div>
    </div>
  );
}
