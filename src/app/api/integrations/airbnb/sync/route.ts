export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { getIntegrationAdmin, requireIntegrationUser, requireOwnedGuide } from "@/lib/integrations/server";
import { runAirbnbGuideSync } from "@/lib/integrations/airbnb-sync-engine";

export async function POST(request: Request) {
  const access = await requireIntegrationUser(request.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const body = await request.json().catch(() => null);
  const guideId = body?.guideId;

  if (!guideId || !(await requireOwnedGuide(admin, access.user.id, guideId))) {
    return NextResponse.json({ error: "Guide not found" }, { status: 404 });
  }

  try {
    const result = await runAirbnbGuideSync({
      admin,
      userId: access.user.id,
      guideId,
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Airbnb sync failed" },
      { status: 500 }
    );
  }
}
