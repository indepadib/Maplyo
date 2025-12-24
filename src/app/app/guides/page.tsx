import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-sm text-zinc-500">Dashboard</div>
          <h1 className="text-2xl font-semibold">Guides</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/"><Button variant="secondary">Landing</Button></Link>
          <Link href="/g/demo"><Button variant="secondary">Guide public</Button></Link>
          <Link href="/app/guides/demo/builder"><Button>Builder</Button></Link>
        </div>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium">Riad Atlas (demo)</div>
          <div className="mt-1 text-sm text-zinc-600">Brouillon • 3 blocs</div>
          <div className="mt-4 flex gap-2">
            <Link href="/app/guides/demo/builder"><Button size="sm">Éditer</Button></Link>
            <Link href="/g/demo"><Button size="sm" variant="secondary">Voir</Button></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
