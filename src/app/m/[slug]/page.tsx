import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceRoleClient } from "@/lib/internal/admin-access";
import type { Guide } from "@/types/blocks";
import { MagicDemoClient } from "./MagicDemoClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function MagicDemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const admin = getServiceRoleClient();
  if (!admin) notFound();

  const { data: demo, error } = await admin
    .from("magic_demos")
    .select("id, slug, property_name, property_type, theme_id, content, status, expires_at, view_count, prospect_id")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !demo || demo.status !== "active") notFound();
  if (demo.expires_at && new Date(demo.expires_at).getTime() < Date.now()) notFound();

  const guide: Guide = {
    id: demo.id,
    slug: demo.slug,
    title: demo.property_name,
    theme: { themeId: demo.theme_id || "minimal-white" },
    blocks: demo.content?.blocks || [],
  };

  return <MagicDemoClient guide={guide} propertyType={demo.property_type} />;
}
