"use client";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function HeroEditor({ data, onChange }: { title?: string; data: any; onChange: (d: any) => void }) {
  const d = data ?? {};
  return (
    <div className="space-y-3">
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Titre</div>
        <Input value={d.title ?? ""} onChange={(e) => onChange({ ...d, title: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Sous-titre</div>
        <Textarea value={d.subtitle ?? ""} onChange={(e) => onChange({ ...d, subtitle: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Image de couverture (URL)</div>
        <Input value={d.coverImageUrl ?? ""} onChange={(e) => onChange({ ...d, coverImageUrl: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">Badges (séparés par virgules)</div>
        <Input
          value={Array.isArray(d.badges) ? d.badges.join(", ") : ""}
          onChange={(e) => onChange({ ...d, badges: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
        />
      </div>
    </div>
  );
}
