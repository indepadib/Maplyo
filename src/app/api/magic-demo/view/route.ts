import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";
import { getServiceRoleClient } from "@/lib/internal/admin-access";

const ViewSchema = z.object({
  slug: z.string().min(3).max(180),
  sessionId: z.string().min(12).max(160),
});

function looksAutomated(userAgent: string) {
  return /(bot|crawler|spider|preview|facebookexternalhit|slackbot|discordbot|whatsapp|telegrambot|linkedinbot|skypeuripreview|headless|uptime|monitor)/i.test(userAgent);
}

function hashSession(sessionId: string) {
  const salt =
    process.env.MAGIC_DEMO_VIEW_SALT ||
    process.env.AI_CHAT_RATE_LIMIT_SALT ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "maplyo-magic-demo-view";
  return createHash("sha256").update(`${salt}:${sessionId}`).digest("hex");
}

export async function POST(req: Request) {
  try {
    const parsed = ViewSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) return NextResponse.json({ tracked: false }, { status: 400 });

    const userAgent = req.headers.get("user-agent") || "";
    if (looksAutomated(userAgent)) return NextResponse.json({ tracked: false, ignored: "automation" });

    const admin = getServiceRoleClient();
    if (!admin) return NextResponse.json({ tracked: false });

    const { data: demo, error } = await admin
      .from("magic_demos")
      .select("id, slug, status, expires_at, prospect_id, view_count")
      .eq("slug", parsed.data.slug)
      .maybeSingle();

    if (error || !demo || demo.status !== "active") {
      return NextResponse.json({ tracked: false }, { status: 404 });
    }

    if (demo.expires_at && new Date(demo.expires_at).getTime() < Date.now()) {
      return NextResponse.json({ tracked: false }, { status: 410 });
    }

    const now = new Date().toISOString();
    const sessionHash = hashSession(parsed.data.sessionId);

    const existing = await admin
      .from("magic_demo_views")
      .select("id, view_count")
      .eq("magic_demo_id", demo.id)
      .eq("session_hash", sessionHash)
      .maybeSingle();

    let isNewSession = false;

    if (!existing.error && existing.data) {
      await admin
        .from("magic_demo_views")
        .update({
          last_viewed_at: now,
          view_count: Number(existing.data.view_count || 1) + 1,
        })
        .eq("id", existing.data.id);
    } else if (!existing.error) {
      const insert = await admin.from("magic_demo_views").insert([{
        magic_demo_id: demo.id,
        session_hash: sessionHash,
        first_viewed_at: now,
        last_viewed_at: now,
        view_count: 1,
      }]);
      isNewSession = !insert.error;
    } else {
      // Migration not active: do not manufacture a sales signal.
      return NextResponse.json({ tracked: false, migrationPending: true });
    }

    if (!isNewSession) return NextResponse.json({ tracked: true, repeatInSession: true });

    const nextViews = Number(demo.view_count || 0) + 1;
    await admin
      .from("magic_demos")
      .update({ view_count: nextViews, last_viewed_at: now })
      .eq("id", demo.id);

    if (demo.prospect_id) {
      await admin.from("sales_activities").insert([{
        prospect_id: demo.prospect_id,
        activity_type: "demo_viewed",
        channel: "magic_demo",
        metadata: {
          magic_demo_id: demo.id,
          magic_demo_slug: demo.slug,
          view_number: nextViews,
          unique_session: true,
        },
      }]).then(() => undefined, () => undefined);

      const { data: prospect } = await admin
        .from("sales_prospects")
        .select("stage, score")
        .eq("id", demo.prospect_id)
        .maybeSingle();

      if (prospect) {
        const patch: Record<string, unknown> = {
          last_activity_at: now,
          updated_at: now,
          score: Math.min(100, Number(prospect.score || 50) + (nextViews === 1 ? 8 : 3)),
        };

        if (["new", "demo_ready", "contacted"].includes(prospect.stage)) {
          patch.stage = "engaged";
          patch.next_action_at = new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString();
        }

        await admin.from("sales_prospects").update(patch).eq("id", demo.prospect_id);
      }
    }

    return NextResponse.json({ tracked: true, viewNumber: nextViews });
  } catch (error) {
    console.error("[magic-demo-view] error", error);
    return NextResponse.json({ tracked: false });
  }
}
