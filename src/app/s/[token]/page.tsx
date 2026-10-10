import type { Metadata } from "next";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import type { Guide } from "@/types/blocks";
import { GuideClient } from "@/app/g/[slug]/GuideClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Your Stay | Maplyo",
  robots: {
    index: false,
    follow: false,
  },
};

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function invalidGuide(message: string): Guide {
  return {
    id: "restricted",
    slug: "stay",
    title: "Stay link unavailable",
    theme: { themeId: "minimal-white" },
    blocks: [{
      id: "stay-unavailable",
      type: "welcome",
      visibility: { mode: "always" },
      data: {
        title: "Stay link unavailable",
        content: message,
      },
    }],
  };
}

export default async function PersonalizedStayPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const admin = adminClient();

  if (!admin || !token || token.length < 24) {
    return <GuideClient guide={invalidGuide("This stay link is invalid or no longer available.")} />;
  }

  const tokenHash = hashToken(token);

  const { data: link } = await admin
    .from("stay_links")
    .select("id, stay_id, guide_id, expires_at, revoked_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (!link || link.revoked_at || new Date(link.expires_at).getTime() <= Date.now()) {
    return <GuideClient guide={invalidGuide("This stay link has expired or was revoked. Please contact the property.")} />;
  }

  const [{ data: stay }, { data: guideRow }] = await Promise.all([
    admin
      .from("stays")
      .select("id, primary_guest_id, check_in_at, check_out_at, metadata")
      .eq("id", link.stay_id)
      .maybeSingle(),
    admin
      .from("guides")
      .select("id, slug, title, theme_id, content, updated_at")
      .eq("id", link.guide_id)
      .maybeSingle(),
  ]);

  if (!stay || !guideRow) {
    return <GuideClient guide={invalidGuide("The stay or guest experience is no longer available.")} />;
  }

  let guestName = stay.metadata?.guest_name || "";
  if (stay.primary_guest_id) {
    const { data: guest } = await admin
      .from("guests")
      .select("first_name")
      .eq("id", stay.primary_guest_id)
      .maybeSingle();

    if (guest?.first_name) guestName = guest.first_name;
  }

  const rawBlocks = Array.isArray(guideRow.content?.blocks)
    ? [...guideRow.content.blocks]
    : [];

  const checkIn = new Date(stay.check_in_at);
  const checkOut = new Date(stay.check_out_at);
  const dateText = checkIn.toLocaleDateString("fr-FR") + " → " + checkOut.toLocaleDateString("fr-FR");

  const welcomeBlock = {
    id: "personalized-stay-welcome",
    type: "welcome" as const,
    title: "Your stay",
    visibility: { mode: "always" as const },
    data: {
      title: guestName ? "Bienvenue, " + guestName : "Bienvenue",
      content: "Votre séjour : " + dateText + ". Retrouvez ici les informations et services utiles pour ce séjour.",
    },
  };

  const heroIndex = rawBlocks.findIndex((block: any) => block.type === "hero");
  if (heroIndex >= 0) rawBlocks.splice(heroIndex + 1, 0, welcomeBlock);
  else rawBlocks.unshift(welcomeBlock);

  const guide: Guide = {
    id: guideRow.id,
    slug: guideRow.slug,
    title: guideRow.title,
    theme: { themeId: guideRow.theme_id || "minimal-white" },
    blocks: rawBlocks,
    updatedAt: guideRow.updated_at,
  };

  await admin
    .from("stay_links")
    .update({ last_accessed_at: new Date().toISOString() })
    .eq("id", link.id);

  return (
    <main className="min-h-screen bg-white">
      <GuideClient guide={guide} />
    </main>
  );
}
