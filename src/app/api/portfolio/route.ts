import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function getUser(req: Request) {
  const authHeader = req.headers.get("authorization");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!authHeader || !url || !anon) return null;

  const client = createClient(url, anon, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });

  const { data: { user } } = await client.auth.getUser();
  return user || null;
}

export async function GET(req: Request) {
  const user = await getUser(req);
  const admin = getAdmin();
  if (!user || !admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const organizationId = url.searchParams.get("organizationId");
  if (!organizationId) return NextResponse.json({ error: "organizationId required" }, { status: 400 });

  const { data: membership } = await admin
    .from("organization_members")
    .select("role")
    .eq("organization_id", organizationId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data: properties, error: propertyError } = await admin
    .from("properties")
    .select("id, name, property_type, status, city, country_code")
    .eq("organization_id", organizationId)
    .neq("status", "archived")
    .order("name");

  if (propertyError) return NextResponse.json({ error: propertyError.message }, { status: 500 });

  const propertyIds = (properties || []).map((property: any) => property.id);
  if (!propertyIds.length) {
    return NextResponse.json({
      currentRole: membership.role,
      properties: [],
      summary: { properties: 0, activeStays: 0, openRequests: 0, urgentRequests: 0, grossRevenue: 0, currency: "MAD" },
    });
  }

  const now = new Date();
  const nowIso = now.toISOString();
  const futureIso = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString();

  const [
    guidesResult,
    staysResult,
    requestsResult,
    ordersResult,
    servicesResult,
    journeysResult,
  ] = await Promise.all([
    admin
      .from("guides")
      .select("id, property_id, slug, title, is_published, guide_views(count)")
      .in("property_id", propertyIds),
    admin
      .from("stays")
      .select("id, property_id, check_in_at, check_out_at, status, primary_guest_id, guests(first_name)")
      .in("property_id", propertyIds)
      .gte("check_out_at", nowIso)
      .lte("check_in_at", futureIso)
      .not("status", "in", '("cancelled","no_show")')
      .order("check_in_at", { ascending: true }),
    admin
      .from("guest_requests")
      .select("id, property_id, priority, status")
      .in("property_id", propertyIds)
      .in("status", ["new","acknowledged","in_progress"]),
    admin
      .from("orders")
      .select("id, property_id, status, total_amount, commission_amount, currency, created_at")
      .in("property_id", propertyIds)
      .gte("created_at", new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .in("status", ["confirmed","paid","fulfilled"]),
    admin
      .from("services")
      .select("id, property_id, status")
      .in("property_id", propertyIds)
      .eq("status", "active"),
    admin
      .from("journey_rules")
      .select("id, property_id, status")
      .in("property_id", propertyIds)
      .eq("status", "active"),
  ]);

  const guides = guidesResult.error ? [] : (guidesResult.data || []);
  const stays = staysResult.error ? [] : (staysResult.data || []);
  const requests = requestsResult.error ? [] : (requestsResult.data || []);
  const orders = ordersResult.error ? [] : (ordersResult.data || []);
  const services = servicesResult.error ? [] : (servicesResult.data || []);
  const journeys = journeysResult.error ? [] : (journeysResult.data || []);

  const mapped = (properties || []).map((property: any) => {
    const propertyGuides = guides.filter((guide: any) => guide.property_id === property.id);
    const publishedGuide = propertyGuides.find((guide: any) => guide.is_published) || propertyGuides[0] || null;
    const guestViews = propertyGuides.reduce((sum: number, guide: any) => sum + Number(guide.guide_views?.[0]?.count || 0), 0);

    const propertyStays = stays.filter((stay: any) => stay.property_id === property.id);
    const currentStay = propertyStays.find((stay: any) =>
      new Date(stay.check_in_at).getTime() <= now.getTime() &&
      new Date(stay.check_out_at).getTime() > now.getTime()
    ) || null;
    const nextStay = propertyStays.find((stay: any) => new Date(stay.check_in_at).getTime() > now.getTime()) || null;

    const propertyRequests = requests.filter((request: any) => request.property_id === property.id);
    const urgentRequests = propertyRequests.filter((request: any) => request.priority === "urgent").length;

    const propertyOrders = orders.filter((order: any) => order.property_id === property.id);
    const grossRevenue = propertyOrders.reduce((sum: number, order: any) => sum + Number(order.total_amount || 0), 0);
    const commissionRevenue = propertyOrders.reduce((sum: number, order: any) => sum + Number(order.commission_amount || 0), 0);
    const currency = propertyOrders.find((order: any) => order.currency)?.currency || "MAD";

    const activeServices = services.filter((service: any) => service.property_id === property.id).length;
    const activeJourneys = journeys.filter((rule: any) => rule.property_id === property.id).length;

    const attention: string[] = [];
    if (!publishedGuide?.is_published) attention.push("Experience not published");
    if (urgentRequests > 0) attention.push(urgentRequests + " urgent guest request" + (urgentRequests > 1 ? "s" : ""));
    if (activeJourneys === 0) attention.push("No guest journey automation");
    if (activeServices === 0) attention.push("No revenue services");

    const guestOf = (stay: any) => {
      const guest = Array.isArray(stay?.guests) ? stay.guests[0] : stay?.guests;
      return guest?.first_name || null;
    };

    return {
      id: property.id,
      name: property.name,
      propertyType: property.property_type,
      status: property.status,
      city: property.city,
      countryCode: property.country_code,
      guide: publishedGuide ? {
        id: publishedGuide.id,
        slug: publishedGuide.slug,
        published: Boolean(publishedGuide.is_published),
      } : null,
      guestViews,
      currentStay: currentStay ? {
        id: currentStay.id,
        guestName: guestOf(currentStay),
        checkInAt: currentStay.check_in_at,
        checkOutAt: currentStay.check_out_at,
      } : null,
      nextStay: nextStay ? {
        id: nextStay.id,
        guestName: guestOf(nextStay),
        checkInAt: nextStay.check_in_at,
        checkOutAt: nextStay.check_out_at,
      } : null,
      openRequests: propertyRequests.length,
      urgentRequests,
      activeServices,
      activeJourneys,
      grossRevenue,
      commissionRevenue,
      currency,
      attention,
      health: attention.length === 0 ? "healthy" : urgentRequests > 0 ? "critical" : "attention",
    };
  });

  const mainCurrency = mapped.find((property: any) => property.grossRevenue > 0)?.currency || "MAD";

  return NextResponse.json({
    currentRole: membership.role,
    properties: mapped,
    summary: {
      properties: mapped.length,
      activeStays: mapped.filter((property: any) => property.currentStay).length,
      openRequests: mapped.reduce((sum: number, property: any) => sum + property.openRequests, 0),
      urgentRequests: mapped.reduce((sum: number, property: any) => sum + property.urgentRequests, 0),
      grossRevenue: mapped
        .filter((property: any) => property.currency === mainCurrency)
        .reduce((sum: number, property: any) => sum + property.grossRevenue, 0),
      commissionRevenue: mapped
        .filter((property: any) => property.currency === mainCurrency)
        .reduce((sum: number, property: any) => sum + property.commissionRevenue, 0),
      currency: mainCurrency,
    },
  });
}
