"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Guide } from "@/types/blocks";

function getUnlockCodeFromGuide(guide: Guide): string | null {
  for (const b of guide.blocks) {
    if (b.visibility?.mode === "with_code" && b.visibility.unlockCode) return b.visibility.unlockCode;
  }
  return null;
}

export function UnlockPanel({ guide, onUnlocked }: { guide: Guide; onUnlocked: () => void }) {
  const expected = useMemo(() => getUnlockCodeFromGuide(guide), [guide]);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  if (!expected) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-medium text-zinc-900">Déverrouiller les infos sensibles</div>
      <div className="mt-1 text-sm text-zinc-600">Entre le code fourni par l’hôte.</div>

      <div className="mt-3 flex gap-2">
        <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" />
        <Button
          onClick={() => {
            if (code.trim() == expected) { setError(null); onUnlocked(); }
            else setError("Code incorrect.");
          }}
        >
          OK
        </Button>
      </div>

      {error ? <div className="mt-2 text-sm text-red-600">{error}</div> : null}
    </div>
  );
}
