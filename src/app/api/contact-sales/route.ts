export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getServiceRoleClient } from "@/lib/internal/admin-access";

const InquirySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().max(50).optional(),
  propertyName: z.string().max(180).optional(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  city: z.string().max(120).optional(),
  propertyType: z.enum(["vacation_rental","property_manager","guest_house","hotel","aparthotel","serviced_apartment","other"]),
  estimatedUnits: z.coerce.number().int().min(1).max(10000).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().max(80).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(160).optional(),
  referrer: z.string().max(500).optional(),
  companyFax: z.string().max(10).optional(), // honeypot
});

const memoryRateLimit = new Map<string, number[]>();

function clientIp(req: Request) {
  return (
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function allowRequest(ip: string) {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  const recent = (memoryRateLimit.get(ip) || []).filter((ts) => ts >= hourAgo);
  if (recent.length >= 5) return false;
  recent.push(now);
  memoryRateLimit.set(ip, recent);
  return true;
}

export async function POST(req: Request) {
  try {
    const parsed = InquirySchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
    }

    const input = parsed.data;

    if (input.companyFax) {
      // Silent success for bots.
      return NextResponse.json({ success: true });
    }

    if (!allowRequest(clientIp(req))) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const admin = getServiceRoleClient();
    if (!admin) {
      return NextResponse.json({ error: "Sales form is temporarily unavailable." }, { status: 503 });
    }

    const { data, error } = await admin
      .from("sales_inquiries")
      .insert([{
        contact_name: input.name,
        contact_email: input.email.toLowerCase(),
        contact_phone: input.phone || null,
        property_name: input.propertyName || null,
        website_url: input.websiteUrl || null,
        city: input.city || null,
        property_type: input.propertyType,
        estimated_units: input.estimatedUnits || null,
        message: input.message || null,
        source: input.source || "contact_sales",
        utm_source: input.utmSource || null,
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        referrer: input.referrer || null,
        status: "new",
      }])
      .select("id")
      .single();

    if (error || !data) {
      console.error("[sales-inquiry] insert failed", error);
      return NextResponse.json({ error: "Could not submit your request." }, { status: 500 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const salesRecipient = process.env.MAPLYO_SALES_EMAIL || "contact@maplyo.com";

    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "Maplyo <contact@maplyo.com>",
          to: salesRecipient,
          replyTo: input.email,
          subject: `New Maplyo sales inquiry · ${input.propertyName || input.name}`,
          text: [
            `Contact: ${input.name} <${input.email}>`,
            input.phone ? `Phone: ${input.phone}` : "",
            input.propertyName ? `Property: ${input.propertyName}` : "",
            `Type: ${input.propertyType}`,
            input.estimatedUnits ? `Rooms / units: ${input.estimatedUnits}` : "",
            input.city ? `City: ${input.city}` : "",
            input.websiteUrl ? `Website: ${input.websiteUrl}` : "",
            input.message ? `\nMessage:\n${input.message}` : "",
            `\nInquiry ID: ${data.id}`,
          ].filter(Boolean).join("\n"),
        });
      } catch (emailError) {
        console.info("[sales-inquiry] email notification unavailable", emailError);
      }
    }

    return NextResponse.json({ success: true, inquiryId: data.id });
  } catch (error) {
    console.error("[sales-inquiry] unexpected error", error);
    return NextResponse.json({ error: "Could not submit your request." }, { status: 500 });
  }
}
