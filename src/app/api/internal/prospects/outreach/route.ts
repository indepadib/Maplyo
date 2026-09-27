import { NextResponse } from "next/server";
import { z } from "zod";
import { requireInternalUser, getServiceRoleClient } from "@/lib/internal/admin-access";
import { createOpenAIClient, cleanAIJSON } from "@/lib/ai/openai";

const Schema = z.object({
  prospectId: z.string().uuid(),
  language: z.enum(["fr", "en"]).default("fr"),
});

export async function POST(req: Request) {
  const access = await requireInternalUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const parsed = Schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const admin = getServiceRoleClient();
  if (!admin) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  const { data: prospect, error } = await admin
    .from("sales_prospects")
    .select("id, property_name, contact_name, contact_email, website_url, city, property_type, estimated_units, score, stage")
    .eq("id", parsed.data.prospectId)
    .eq("created_by", access.user.id)
    .maybeSingle();

  if (error || !prospect) return NextResponse.json({ error: "Prospect not found" }, { status: 404 });

  const { data: demo } = await admin
    .from("magic_demos")
    .select("slug, view_count, last_viewed_at, status")
    .eq("prospect_id", prospect.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!demo?.slug) {
    return NextResponse.json({ error: "Create a Magic Demo before generating outreach" }, { status: 409 });
  }

  const origin = new URL(req.url).origin;
  const demoUrl = `${origin}/m/${demo.slug}`;
  const openai = createOpenAIClient();

  const fallback = parsed.data.language === "fr"
    ? {
        subject: `Une démo Maplyo pour ${prospect.property_name}`,
        body: `Bonjour${prospect.contact_name ? ` ${prospect.contact_name}` : ""},

J’ai préparé une version personnalisée de l’expérience voyageur Maplyo pour ${prospect.property_name}. Elle montre comment centraliser les informations du séjour, le concierge IA et les services additionnels dans une seule interface mobile.

Vous pouvez la tester ici : ${demoUrl}

Si le concept vous intéresse, je peux vous montrer en 15 minutes comment l’adapter à votre fonctionnement réel.

Bien à vous,
Maplyo`,
      }
    : {
        subject: `A Maplyo demo for ${prospect.property_name}`,
        body: `Hi${prospect.contact_name ? ` ${prospect.contact_name}` : ""},

I prepared a personalized Maplyo guest experience for ${prospect.property_name}. It shows how property information, an AI concierge and ancillary services can live in one mobile guest interface.

You can try it here: ${demoUrl}

If it is relevant, I can show you in 15 minutes how we would adapt it to your real guest journey.

Best,
Maplyo`,
      };

  if (!openai) return NextResponse.json({ outreach: fallback, demoUrl });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.45,
      max_tokens: 350,
      messages: [
        {
          role: "system",
          content: `You are Maplyo's senior hospitality SaaS SDR.
Write a concise, credible personalized first-touch email.
Do not invent facts, ROI figures, client references, integrations or performance claims.
Do not sound like generic AI sales copy.
The strongest hook is that a personalized working demo has ALREADY been built for the prospect.
Keep the body under 120 words.
Subject under 8 words.
Use the requested language.
Return strict JSON: {"subject":"...","body":"..."}.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            language: parsed.data.language,
            propertyName: prospect.property_name,
            contactName: prospect.contact_name,
            city: prospect.city,
            propertyType: prospect.property_type,
            estimatedUnits: prospect.estimated_units,
            website: prospect.website_url,
            demoUrl,
          }),
        },
      ],
    });

    const raw = response.choices[0]?.message?.content || "";
    const generated = cleanAIJSON(raw);

    if (!generated?.subject || !generated?.body) {
      return NextResponse.json({ outreach: fallback, demoUrl });
    }

    return NextResponse.json({
      outreach: {
        subject: String(generated.subject).slice(0, 140),
        body: String(generated.body).slice(0, 2500),
      },
      demoUrl,
    });
  } catch (e) {
    console.error("[outreach] generation failed", e);
    return NextResponse.json({ outreach: fallback, demoUrl });
  }
}
