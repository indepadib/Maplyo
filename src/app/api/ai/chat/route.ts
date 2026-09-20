export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { z } from "zod";
import { createOpenAIClient } from "@/lib/ai/openai";
import { mockGuide } from "@/lib/mockGuide";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(800),
});

const ChatSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(12),
  guideId: z.string().max(80).optional(),
  guideSlug: z.string().max(180).optional(),
  lang: z.string().max(10).optional(),
});

const memoryBuckets = new Map<string, number[]>();

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function getAuthenticatedUser(authHeader: string | null) {
  if (!authHeader) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const client = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });

  const { data: { user } } = await client.auth.getUser();
  return user || null;
}

function clientIp(req: Request) {
  return (
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function visitorHash(req: Request) {
  const salt =
    process.env.AI_CHAT_RATE_LIMIT_SALT ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "maplyo-rate-limit";
  return createHash("sha256").update(`${salt}:${clientIp(req)}`).digest("hex");
}

async function enforceRateLimit(admin: any, contextKey: string, visitor: string) {
  const now = Date.now();
  const hourAgoMs = now - 60 * 60 * 1000;
  const memoryKey = `${contextKey}:${visitor}`;
  const recent = (memoryBuckets.get(memoryKey) || []).filter((ts) => ts >= hourAgoMs);

  if (recent.length >= 20) return false;
  recent.push(now);
  memoryBuckets.set(memoryKey, recent);

  if (!admin) return true;

  const hourAgo = new Date(hourAgoMs).toISOString();
  const dayAgo = new Date(now - 24 * 60 * 60 * 1000).toISOString();

  const [visitorCount, contextCount] = await Promise.all([
    admin
      .from("ai_chat_usage")
      .select("*", { count: "exact", head: true })
      .eq("context_key", contextKey)
      .eq("visitor_hash", visitor)
      .gte("created_at", hourAgo),
    admin
      .from("ai_chat_usage")
      .select("*", { count: "exact", head: true })
      .eq("context_key", contextKey)
      .gte("created_at", dayAgo),
  ]);

  // Fail open while migration is rolling out, but keep the in-memory guard above.
  if (!visitorCount.error && (visitorCount.count || 0) >= 20) return false;
  if (!contextCount.error && (contextCount.count || 0) >= 300) return false;

  if (!visitorCount.error) {
    await admin.from("ai_chat_usage").insert([{
      context_key: contextKey,
      visitor_hash: visitor,
    }]);
  }

  return true;
}

async function resolveContext(
  admin: any,
  guideId: string | undefined,
  guideSlug: string | undefined,
  authHeader: string | null
) {
  if (guideId === "demo" || guideSlug === "demo") {
    return {
      key: "demo",
      title: mockGuide.title,
      blocks: mockGuide.blocks.map((b) => ({ type: b.type, title: b.title, data: b.data })),
    };
  }

  if (!admin) return null;

  if (guideId) {
    const guideResult = await admin
      .from("guides")
      .select("id, user_id, title, content, is_published")
      .eq("id", guideId)
      .maybeSingle();

    if (!guideResult.error && guideResult.data) {
      const guide = guideResult.data;

      if (!guide.is_published) {
        const user = await getAuthenticatedUser(authHeader);
        if (!user || user.id !== guide.user_id) return null;
      }

      return {
        key: `guide:${guide.id}`,
        title: guide.title,
        blocks: guide.content?.blocks || [],
      };
    }

    const magicById = await admin
      .from("magic_demos")
      .select("id, slug, property_name, content, status, expires_at")
      .eq("id", guideId)
      .maybeSingle();

    if (!magicById.error && magicById.data) {
      const demo = magicById.data;
      if (demo.status !== "active") return null;
      if (demo.expires_at && new Date(demo.expires_at).getTime() < Date.now()) return null;

      return {
        key: `magic:${demo.id}`,
        title: demo.property_name,
        blocks: demo.content?.blocks || [],
      };
    }
  }

  if (guideSlug) {
    const magic = await admin
      .from("magic_demos")
      .select("id, slug, property_name, content, status, expires_at")
      .eq("slug", guideSlug)
      .maybeSingle();

    if (!magic.error && magic.data) {
      if (magic.data.status !== "active") return null;
      if (magic.data.expires_at && new Date(magic.data.expires_at).getTime() < Date.now()) return null;

      return {
        key: `magic:${magic.data.id}`,
        title: magic.data.property_name,
        blocks: magic.data.content?.blocks || [],
      };
    }
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const parsed = ChatSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid chat request" }, { status: 400 });
    }

    const { messages, guideId, guideSlug } = parsed.data;
    const admin = getAdmin();
    const context = await resolveContext(admin, guideId, guideSlug, req.headers.get("authorization"));

    if (!context) {
      return NextResponse.json({ error: "Guest experience not available" }, { status: 404 });
    }

    const visitor = visitorHash(req);
    const allowed = await enforceRateLimit(admin, context.key, visitor);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many concierge messages. Please try again later." },
        { status: 429 }
      );
    }

    const openai = createOpenAIClient();
    if (!openai) {
      return NextResponse.json({ error: "AI configuration missing" }, { status: 503 });
    }

    const systemPrompt = `
You are the digital concierge for a hospitality property.
Answer the guest using ONLY the verified property information in the context below.
Never invent access codes, opening hours, prices, policies, availability or booking confirmations.
Be concise, warm and useful. Reply in the same language as the guest unless asked otherwise.

You must also decide whether a human/property team should take over.
Set needsHuman=true when:
- the guest explicitly asks for a human/staff/reception/host;
- the guest reports maintenance, housekeeping, lost property, a complaint, safety concern or another operational issue;
- the guest requests an action you cannot execute;
- the verified property context does not contain the answer and staff input is needed.

Set needsHuman=false when the verified context fully answers the question without staff action.

Return STRICT JSON:
{
  "reply": "guest-facing answer in the guest language",
  "needsHuman": true,
  "reason": "missing_info|action_required|guest_requested_human|operational_issue|none",
  "suggestedCategory": "housekeeping|maintenance|information|complaint|lost_found|transport|food_beverage|other",
  "suggestedTitle": "short request title"
}

PROPERTY:
${context.title}

VERIFIED GUEST EXPERIENCE DATA:
${JSON.stringify(context.blocks)}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-6),
      ],
      temperature: 0.2,
      max_tokens: 350,
      response_format: { type: "json_object" },
    });

    const raw = response.choices[0]?.message?.content || "{}";

    try {
      const parsedReply = JSON.parse(raw);
      return NextResponse.json({
        reply: typeof parsedReply.reply === "string" ? parsedReply.reply : "",
        needsHuman: Boolean(parsedReply.needsHuman),
        reason: typeof parsedReply.reason === "string" ? parsedReply.reason : "none",
        suggestedCategory: typeof parsedReply.suggestedCategory === "string" ? parsedReply.suggestedCategory : "other",
        suggestedTitle: typeof parsedReply.suggestedTitle === "string" ? parsedReply.suggestedTitle : "Guest assistance",
      });
    } catch {
      return NextResponse.json({
        reply: raw,
        needsHuman: false,
        reason: "none",
        suggestedCategory: "other",
        suggestedTitle: "Guest assistance",
      });
    }
  } catch (error) {
    console.error("[ai-chat] error", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
