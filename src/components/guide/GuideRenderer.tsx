import { blockRegistry } from "@/components/blocks/registry";
import type { Guide } from "@/types/blocks";

export function GuideRenderer({ guide, unlocked }: { guide: Guide; unlocked: boolean }) {
  return (
    <div className="space-y-4">
      {guide.blocks.map((b) => {
        const def = blockRegistry[b.type];
        const Traveler = def?.Traveler;
        if (!Traveler) return null;
        return (
          <Traveler
            key={b.id}
            title={b.title}
            data={b.data}
            ctx={{ mode: "traveler", unlocked }}
            visibility={b.visibility}
          />
        );
      })}
    </div>
  );
}
