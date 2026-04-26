"use client";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FileUploader } from "@/components/ui/FileUploader";
import { useTranslation } from "@/components/providers/LanguageProvider";

export function HeroEditor({ data, onChange }: { title?: string; data: any; onChange: (d: any) => void }) {
  const d = data ?? {};
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">{t.editor.common.title}</div>
        <Input value={d.title ?? ""} onChange={(e) => onChange({ ...d, title: e.target.value })} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">{t.editor.common.description}</div>
        <Textarea value={d.subtitle ?? ""} onChange={(e) => onChange({ ...d, subtitle: e.target.value })} />
      </div>
      <div>
        <FileUploader
          label={t.editor.common.uploadImage}
          value={d.coverImageUrl}
          onUpload={(url) => onChange({ ...d, coverImageUrl: url })}
          accept="image/*"
        />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-zinc-700">{t.editor.common.tags}</div>
        <Input
          value={Array.isArray(d.badges) ? d.badges.join(", ") : ""}
          onChange={(e) => onChange({ ...d, badges: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          placeholder={t.editor.common.placeholderTags}
        />
      </div>
    </div>
  );
}
