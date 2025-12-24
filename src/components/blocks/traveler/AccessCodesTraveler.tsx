import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { VisibilityRule } from "@/types/blocks";

export function AccessCodesTraveler({
  title, data, ctx, visibility,
}: {
  title?: string;
  data: any;
  ctx: { unlocked: boolean };
  visibility?: VisibilityRule;
}) {
  const mode = visibility?.mode ?? "always";
  const locked = mode === "with_code" && !ctx.unlocked;

  const apt = data?.apartmentDoorCode ? String(data.apartmentDoorCode) : "";
  const building = data?.buildingDoorCode ? String(data.buildingDoorCode) : "";
  const gate = data?.gateCode ? String(data.gateCode) : "";
  const notes = data?.notes ? String(data.notes) : "";

  return (
    <Card>
      <CardHeader><CardTitle>{title ?? "Codes d’accès"}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {locked ? (
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
            Ce bloc est verrouillé.
          </div>
        ) : (
          <div className="grid gap-2 text-sm">
            {apt ? <div><span className="font-medium">Porte logement :</span> {apt}</div> : null}
            {building ? <div><span className="font-medium">Porte immeuble :</span> {building}</div> : null}
            {gate ? <div><span className="font-medium">Portail :</span> {gate}</div> : null}
            {!apt && !building && !gate ? <div className="text-zinc-500">—</div> : null}
          </div>
        )}
        {notes ? <div className="text-sm text-zinc-600">{notes}</div> : null}
      </CardContent>
    </Card>
  );
}
