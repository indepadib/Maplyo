import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";

export function HeroTraveler({ data }: { title?: string; data: any; ctx: any; visibility?: any }) {
  const title = String(data?.title ?? "");
  const subtitle = data?.subtitle ? String(data.subtitle) : "";
  const cover = data?.coverImageUrl ? String(data.coverImageUrl) : "";
  const badges: string[] = Array.isArray(data?.badges) ? data.badges.map(String) : [];

  return (
    <Card className="overflow-hidden">
      {cover ? (
        <div className="relative h-48 w-full">
          <Image src={cover} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <div className="text-2xl font-semibold text-white">{title}</div>
            {subtitle ? <div className="mt-1 text-sm text-white/90">{subtitle}</div> : null}
          </div>
        </div>
      ) : null}

      <CardContent>
        {!cover ? (
          <>
            <div className="text-2xl font-semibold text-zinc-900">{title}</div>
            {subtitle ? <div className="mt-1 text-sm text-zinc-600">{subtitle}</div> : null}
          </>
        ) : null}

        {badges.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <span key={i} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-800">
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
