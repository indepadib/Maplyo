"use client";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { VisibilityRule } from "@/types/blocks";

export function AccessCodesEditor({
  data, onChange, visibility, onChangeVisibility,
}: {
  title?: string;
  data: any;
  onChange: (d: any) => void;
  visibility?: VisibilityRule;
  onChangeVisibility?: (v: VisibilityRule) => void;
}) {
  const d = data ?? {};
  const v: VisibilityRule = visibility ?? { mode: "with_code", unlockCode: "0000" };

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
        <div className="text-xs font-medium text-zinc-800">Sécurité</div>
        <div className="mt-2">
          <div className="mb-1 text-xs font-medium text-zinc-700">Mode</div>
          <select
            className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
            value={v.mode}
            onChange={(e) => onChangeVisibility?.({ ...v, mode: e.target.value as any })}
          >
            <option value="always">Toujours visible</option>
            <option value="with_code">Déverrouillage par code</option>
            <option value="date_based" disabled>Par date (V1.1)</option>
          </select>
        </div>

        {v.mode === "with_code" ? (
          <div className="mt-2">
            <div className="mb-1 text-xs font-medium text-zinc-700">Code de déverrouillage</div>
            <Input value={v.unlockCode ?? ""} onChange={(e) => onChangeVisibility?.({ ...v, unlockCode: e.target.value })} />
            <div className="mt-1 text-xs text-zinc-600">Ex: le code que tu envoies au voyageur.</div>
          </div>
        ) : null}
      </div>

      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Code porte logement</div>
        <Input value={d.apartmentDoorCode ?? ""} onChange={(e) => onChange({ ...d, apartmentDoorCode: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Code porte immeuble</div>
        <Input value={d.buildingDoorCode ?? ""} onChange={(e) => onChange({ ...d, buildingDoorCode: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Code portail</div>
        <Input value={d.gateCode ?? ""} onChange={(e) => onChange({ ...d, gateCode: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Notes</div>
        <Textarea value={d.notes ?? ""} onChange={(e) => onChange({ ...d, notes: e.target.value })} />
      </div>
    </div>
  );
}
