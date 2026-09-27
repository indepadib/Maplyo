export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { TuyaConnector, type TuyaRegion } from "@/lib/integrations/tuya";
import { encryptIntegrationSecret, decryptIntegrationSecret } from "@/lib/integrations/secrets";
import { getIntegrationAdmin, requireIntegrationUser, getOwnedPropertyFromGuide } from "@/lib/integrations/server";

const ConnectSchema = z.object({
  accessId: z.string().min(6).max(128),
  accessSecret: z.string().min(8).max(256),
  region: z.enum(["eu","us","cn","in"]).default("eu"),
});

const AssignSchema = z.object({
  guideId: z.string().uuid(),
  deviceId: z.string().min(4).max(160),
  codeLength: z.union([z.literal(6), z.literal(7)]).default(6),
});

function safeDevice(device: any) {
  return {
    id: String(device?.id || ""),
    name: String(device?.name || "Tuya device"),
    category: device?.category ? String(device.category) : null,
    productName: device?.product_name ? String(device.product_name) : null,
    online: typeof device?.online === "boolean" ? device.online : null,
    sub: typeof device?.sub === "boolean" ? device.sub : null,
    timeZone: device?.time_zone ? String(device.time_zone) : null,
  };
}

async function findIntegration(admin: any, userId: string) {
  const { data } = await admin
    .from("integrations")
    .select("id, credentials, settings, status, health_status, last_tested_at, last_sync_at, last_error")
    .eq("user_id", userId)
    .eq("type", "tuya")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data || null;
}

async function readSecret(admin: any, integration: any) {
  const { data: secret } = await admin
    .from("integration_secrets")
    .select("ciphertext, iv, auth_tag")
    .eq("integration_id", integration.id)
    .maybeSingle();

  if (secret) return decryptIntegrationSecret<{ accessId: string; accessSecret: string; region: TuyaRegion }>(secret);

  // One-time migration path for legacy credentials previously stored in JSONB.
  const legacy = integration.credentials || {};
  if (legacy.accessId && legacy.accessSecret) {
    const region = (["eu","us","cn","in"].includes(legacy.region) ? legacy.region : "eu") as TuyaRegion;
    const payload = { accessId: legacy.accessId, accessSecret: legacy.accessSecret, region };
    const encrypted = encryptIntegrationSecret(payload);

    await admin.from("integration_secrets").upsert({
      integration_id: integration.id,
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv,
      auth_tag: encrypted.authTag,
      key_version: encrypted.keyVersion,
      updated_at: new Date().toISOString(),
    });

    await admin.from("integrations").update({
      credentials: {},
      settings: { ...(integration.settings || {}), region, account_hint: String(legacy.accessId).slice(-4) },
      updated_at: new Date().toISOString(),
    }).eq("id", integration.id);

    return payload;
  }

  throw new Error("Tuya credentials are not configured");
}

export async function POST(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const parsed = ConnectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid Tuya credentials" }, { status: 400 });

  const { accessId, accessSecret, region } = parsed.data;

  try {
    const connector = new TuyaConnector(accessId, accessSecret, region);
    await connector.testConnection();
    const devices = await connector.listDevices();

    let integration = await findIntegration(admin, access.user.id);
    const now = new Date().toISOString();

    if (!integration) {
      const { data, error } = await admin
        .from("integrations")
        .insert([{
          user_id: access.user.id,
          type: "tuya",
          credentials: {},
          settings: { region, account_hint: accessId.slice(-4) },
          status: "active",
          health_status: "healthy",
          last_tested_at: now,
          last_error: null,
        }])
        .select("id, settings, status, health_status, last_tested_at, last_sync_at, last_error, credentials")
        .single();

      if (error || !data) throw new Error(error?.message || "Could not save Tuya connection");
      integration = data;
    } else {
      await admin.from("integrations").update({
        credentials: {},
        settings: { ...(integration.settings || {}), region, account_hint: accessId.slice(-4) },
        status: "active",
        health_status: "healthy",
        last_tested_at: now,
        last_error: null,
        updated_at: now,
      }).eq("id", integration.id);
    }

    const encrypted = encryptIntegrationSecret({ accessId, accessSecret, region });
    await admin.from("integration_secrets").upsert({
      integration_id: integration.id,
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv,
      auth_tag: encrypted.authTag,
      key_version: encrypted.keyVersion,
      updated_at: now,
    });

    return NextResponse.json({
      connected: true,
      health: "healthy",
      accountHint: accessId.slice(-4),
      region,
      testedAt: now,
      devices: devices.map(safeDevice).filter((device) => device.id),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Tuya connection failed" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const integration = await findIntegration(admin, access.user.id);
  if (!integration) return NextResponse.json({ connected: false, health: "disconnected", devices: [] });

  try {
    const secret = await readSecret(admin, integration);
    const connector = new TuyaConnector(secret.accessId, secret.accessSecret, secret.region);
    await connector.testConnection();
    const devices = await connector.listDevices();
    const now = new Date().toISOString();

    await admin.from("integrations").update({
      health_status: "healthy",
      last_tested_at: now,
      last_error: null,
      updated_at: now,
    }).eq("id", integration.id);

    return NextResponse.json({
      connected: true,
      health: "healthy",
      accountHint: integration.settings?.account_hint || secret.accessId.slice(-4),
      region: secret.region,
      testedAt: now,
      devices: devices.map(safeDevice).filter((device) => device.id),
    });
  } catch (error: any) {
    const message = String(error?.message || "Tuya health check failed").slice(0, 500);
    await admin.from("integrations").update({
      health_status: "error",
      last_error: message,
      last_tested_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq("id", integration.id);

    return NextResponse.json({
      connected: true,
      health: "error",
      error: message,
      devices: [],
    });
  }
}

export async function PUT(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const parsed = AssignSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid lock assignment" }, { status: 400 });

  const { guideId, deviceId, codeLength } = parsed.data;
  const context = await getOwnedPropertyFromGuide(admin, access.user.id, guideId);
  if (!context) {
    return NextResponse.json({ error: "This guide is not attached to a property yet" }, { status: 400 });
  }

  const integration = await findIntegration(admin, access.user.id);
  if (!integration) return NextResponse.json({ error: "Connect Tuya first" }, { status: 400 });

  try {
    const secret = await readSecret(admin, integration);
    const connector = new TuyaConnector(secret.accessId, secret.accessSecret, secret.region);
    const device = await connector.getDevice(deviceId);
    const now = new Date().toISOString();

    await admin.from("property_connections").upsert({
      property_id: context.propertyId,
      tuya_integration_id: integration.id,
      tuya_device_id: deviceId,
      tuya_device_name: device?.name || null,
      tuya_code_length: codeLength,
      tuya_assigned_at: now,
      updated_at: now,
    });

    return NextResponse.json({
      success: true,
      propertyId: context.propertyId,
      propertyName: context.property?.name || null,
      device: safeDevice(device),
      codeLength,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Could not assign Tuya lock" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const integration = await findIntegration(admin, access.user.id);
  if (!integration) return NextResponse.json({ success: true });

  await admin
    .from("property_connections")
    .update({
      tuya_integration_id: null,
      tuya_device_id: null,
      tuya_device_name: null,
      tuya_assigned_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("tuya_integration_id", integration.id);

  await admin.from("integrations").delete().eq("id", integration.id);
  return NextResponse.json({ success: true });
}
