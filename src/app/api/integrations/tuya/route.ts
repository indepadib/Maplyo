import { withIntegrationErrors } from "@/lib/integrations/route-errors";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { TuyaConnector, type TuyaRegion } from "@/lib/integrations/tuya";
import { encryptIntegrationSecret, decryptIntegrationSecret } from "@/lib/integrations/secrets";
import {
  getIntegrationAdmin,
  requireIntegrationUser,
  getOwnedPropertyFromGuide,
  getLegacyGuideConnection,
  saveLegacyGuideConnection,
  isSchemaCompatibilityError,
} from "@/lib/integrations/server";

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
    id: String(device?.id || device?.device_id || ""),
    name: String(device?.name || device?.device_name || device?.custom_name || "Tuya device"),
    category: device?.category ? String(device.category) : null,
    productName: device?.product_name ? String(device.product_name) : null,
    online: typeof device?.online === "boolean" ? device.online : null,
    sub: typeof device?.sub === "boolean" ? device.sub : null,
    timeZone: device?.time_zone ? String(device.time_zone) : null,
  };
}

async function findIntegration(admin: any, userId: string) {
  try {
    const { data } = await admin
      .from("integrations")
      .select("id, credentials, settings, status, health_status, last_tested_at, last_sync_at, last_error")
      .eq("user_id", userId)
      .eq("type", "tuya")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .throwOnError();
    return data || null;
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;
    const { data } = await admin
      .from("integrations")
      .select("id, credentials, settings, status, created_at, updated_at")
      .eq("user_id", userId)
      .eq("type", "tuya")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .throwOnError();
    return data || null;
  }
}

async function readSecret(admin: any, integration: any) {
  try {
    const { data: secret } = await admin
      .from("integration_secrets")
      .select("ciphertext, iv, auth_tag")
      .eq("integration_id", integration.id)
      .maybeSingle()
      .throwOnError();

    if (secret) {
      return decryptIntegrationSecret<{ accessId: string; accessSecret: string; region: TuyaRegion }>(secret);
    }
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;
  }

  const legacy = integration.credentials || {};

  if (legacy.encrypted_v1?.ciphertext) {
    return decryptIntegrationSecret<{ accessId: string; accessSecret: string; region: TuyaRegion }>({
      ciphertext: legacy.encrypted_v1.ciphertext,
      iv: legacy.encrypted_v1.iv,
      auth_tag: legacy.encrypted_v1.auth_tag,
    });
  }

  // One-time migration path from the original plaintext JSONB implementation.
  if (legacy.accessId && legacy.accessSecret) {
    return {
      accessId: String(legacy.accessId),
      accessSecret: String(legacy.accessSecret),
      region: (["eu","us","cn","in"].includes(legacy.region) ? legacy.region : "eu") as TuyaRegion,
    };
  }

  throw new Error("Tuya credentials are not configured");
}

async function writeSecret(
  admin: any,
  integrationId: string,
  credentials: { accessId: string; accessSecret: string; region: TuyaRegion }
) {
  const encrypted = encryptIntegrationSecret(credentials);
  const now = new Date().toISOString();

  try {
    await admin.from("integration_secrets").upsert({
      integration_id: integrationId,
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv,
      auth_tag: encrypted.authTag,
      key_version: encrypted.keyVersion,
      updated_at: now,
    }).throwOnError();

    await admin
      .from("integrations")
      .update({ credentials: {}, updated_at: now })
      .eq("id", integrationId)
      .throwOnError();

    return "vault" as const;
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;

    await admin
      .from("integrations")
      .update({
        credentials: {
          encrypted_v1: {
            ciphertext: encrypted.ciphertext,
            iv: encrypted.iv,
            auth_tag: encrypted.authTag,
            key_version: encrypted.keyVersion,
          },
        },
        updated_at: now,
      })
      .eq("id", integrationId)
      .throwOnError();

    return "legacy_encrypted" as const;
  }
}

async function updateIntegrationHealth(admin: any, integrationId: string, values: {
  status?: string;
  health?: string;
  testedAt?: string | null;
  syncAt?: string | null;
  error?: string | null;
  settings?: Record<string, any>;
}) {
  const base = {
    ...(values.status ? { status: values.status } : {}),
    ...(values.settings ? { settings: values.settings } : {}),
    updated_at: new Date().toISOString(),
  };

  try {
    await admin
      .from("integrations")
      .update({
        ...base,
        ...(values.health ? { health_status: values.health } : {}),
        ...(values.testedAt !== undefined ? { last_tested_at: values.testedAt } : {}),
        ...(values.syncAt !== undefined ? { last_sync_at: values.syncAt } : {}),
        ...(values.error !== undefined ? { last_error: values.error } : {}),
      })
      .eq("id", integrationId)
      .throwOnError();
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;
    await admin.from("integrations").update(base).eq("id", integrationId).throwOnError();
  }
}

async function createIntegration(admin: any, userId: string, region: TuyaRegion, hint: string) {
  const now = new Date().toISOString();

  try {
    const { data } = await admin
      .from("integrations")
      .insert([{
        user_id: userId,
        type: "tuya",
        credentials: {},
        settings: { region, account_hint: hint },
        status: "active",
        health_status: "healthy",
        last_tested_at: now,
        last_error: null,
      }])
      .select("id, credentials, settings, status, health_status, last_tested_at, last_sync_at, last_error")
      .single()
      .throwOnError();

    return data;
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;

    const { data } = await admin
      .from("integrations")
      .insert([{
        user_id: userId,
        type: "tuya",
        credentials: {},
        settings: { region, account_hint: hint },
        status: "active",
      }])
      .select("id, credentials, settings, status")
      .single()
      .throwOnError();

    return data;
  }
}

async function saveDeviceAssignment(admin: any, context: any, integrationId: string, device: any, codeLength: 6 | 7) {
  const now = new Date().toISOString();
  const deviceId = String(device?.id || device?.device_id || "");
  const deviceName = String(device?.name || device?.device_name || deviceId);

  if (context.mode === "property") {
    await admin.from("property_connections").upsert({
      property_id: context.propertyId,
      tuya_integration_id: integrationId,
      tuya_device_id: deviceId,
      tuya_device_name: deviceName,
      tuya_code_length: codeLength,
      tuya_assigned_at: now,
      updated_at: now,
    }).throwOnError();
    return;
  }

  const existing = await getLegacyGuideConnection(admin, context.guideId);
  const config = {
    ...(existing?.config || {}),
    tuyaDeviceId: deviceId,
    tuyaDeviceName: deviceName,
    tuyaCodeLength: codeLength,
    tuyaAssignedAt: now,
  };

  await saveLegacyGuideConnection(admin, context.guideId, config, {
    integrationId,
    externalId: deviceId,
  });
}

async function handlePOST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const access = await requireIntegrationUser(authHeader);
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin(authHeader);
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const parsed = ConnectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid Tuya credentials" }, { status: 400 });

  const { accessId, accessSecret, region } = parsed.data;

  try {
    // Fail before any database write if no stable encryption key can be derived.
    encryptIntegrationSecret({ accessId, accessSecret, region });

    const connector = new TuyaConnector(accessId, accessSecret, region);
    await connector.testConnection();
    const devices = await connector.listDevices();

    let integration = await findIntegration(admin, access.user.id);
    if (!integration) {
      integration = await createIntegration(admin, access.user.id, region, accessId.slice(-4));
    }
    if (!integration?.id) throw new Error("Could not save Tuya connection");

    const secretStorage = await writeSecret(admin, integration.id, { accessId, accessSecret, region });
    const now = new Date().toISOString();

    await updateIntegrationHealth(admin, integration.id, {
      status: "active",
      health: "healthy",
      testedAt: now,
      error: null,
      settings: { ...(integration.settings || {}), region, account_hint: accessId.slice(-4) },
    });

    return NextResponse.json({
      connected: true,
      health: "healthy",
      accountHint: accessId.slice(-4),
      region,
      testedAt: now,
      secretStorage,
      devices: devices.map(safeDevice).filter((device) => device.id),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Tuya connection failed" }, { status: 400 });
  }
}

async function handleGET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const access = await requireIntegrationUser(authHeader);
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin(authHeader);
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const integration = await findIntegration(admin, access.user.id);
  if (!integration) return NextResponse.json({ connected: false, health: "disconnected", devices: [] });

  try {
    const secret = await readSecret(admin, integration);
    const connector = new TuyaConnector(secret.accessId, secret.accessSecret, secret.region);
    await connector.testConnection();
    const devices = await connector.listDevices();
    const now = new Date().toISOString();

    await updateIntegrationHealth(admin, integration.id, {
      health: "healthy",
      testedAt: now,
      error: null,
    });

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
    await updateIntegrationHealth(admin, integration.id, {
      health: "error",
      testedAt: new Date().toISOString(),
      error: message,
    });

    return NextResponse.json({
      connected: true,
      health: "error",
      error: message,
      devices: [],
    });
  }
}

async function handlePUT(req: Request) {
  const authHeader = req.headers.get("authorization");
  const access = await requireIntegrationUser(authHeader);
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin(authHeader);
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const parsed = AssignSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid lock assignment" }, { status: 400 });

  const { guideId, deviceId, codeLength } = parsed.data;
  const context = await getOwnedPropertyFromGuide(admin, access.user.id, guideId);
  if (!context) return NextResponse.json({ error: "Guide not found" }, { status: 404 });

  const integration = await findIntegration(admin, access.user.id);
  if (!integration) return NextResponse.json({ error: "Connect Tuya first" }, { status: 400 });

  try {
    const secret = await readSecret(admin, integration);
    const connector = new TuyaConnector(secret.accessId, secret.accessSecret, secret.region);
    const device = await connector.getDevice(deviceId);

    await saveDeviceAssignment(admin, context, integration.id, device, codeLength);

    return NextResponse.json({
      success: true,
      storageMode: context.mode,
      propertyId: context.propertyId,
      propertyName: context.property?.name || null,
      device: safeDevice(device),
      codeLength,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Could not assign Tuya lock" }, { status: 400 });
  }
}

async function handleDELETE(req: Request) {
  const authHeader = req.headers.get("authorization");
  const access = await requireIntegrationUser(authHeader);
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin(authHeader);
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const guideId = new URL(req.url).searchParams.get("guideId");

  if (guideId) {
    const context = await getOwnedPropertyFromGuide(admin, access.user.id, guideId);
    if (!context) return NextResponse.json({ success: true });

    if (context.mode === "property") {
      await admin
        .from("property_connections")
        .update({
          tuya_integration_id: null,
          tuya_device_id: null,
          tuya_device_name: null,
          tuya_assigned_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq("property_id", context.propertyId)
        .throwOnError();
    } else {
      const existing = await getLegacyGuideConnection(admin, context.guideId);
      if (existing?.id) {
        const config = { ...(existing.config || {}) };
        delete config.tuyaDeviceId;
        delete config.tuyaDeviceName;
        delete config.tuyaCodeLength;
        delete config.tuyaAssignedAt;
        await saveLegacyGuideConnection(admin, context.guideId, config, {
          integrationId: null,
          externalId: null,
        });
      }
    }

    return NextResponse.json({
      success: true,
      storageMode: context.mode,
      propertyId: context.propertyId,
      disconnectedAccount: false,
    });
  }

  const integration = await findIntegration(admin, access.user.id);
  if (!integration) return NextResponse.json({ success: true });

  try {
    await admin
      .from("property_connections")
      .update({
        tuya_integration_id: null,
        tuya_device_id: null,
        tuya_device_name: null,
        tuya_assigned_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("tuya_integration_id", integration.id)
      .throwOnError();
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;
  }

  try {
    const { data: legacyRows } = await admin
      .from("guide_integrations")
      .select("id, guide_id, config")
      .eq("integration_id", integration.id)
      .throwOnError();

    for (const row of legacyRows || []) {
      const config = { ...(row.config || {}) };
      delete config.tuyaDeviceId;
      delete config.tuyaDeviceName;
      delete config.tuyaCodeLength;
      delete config.tuyaAssignedAt;
      await saveLegacyGuideConnection(admin, row.guide_id, config, {
        integrationId: null,
        externalId: null,
      });
    }
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;
  }

  await admin.from("integrations").delete().eq("id", integration.id).throwOnError();
  return NextResponse.json({ success: true, disconnectedAccount: true });
}

export const POST = withIntegrationErrors(handlePOST);
export const GET = withIntegrationErrors(handleGET);
export const PUT = withIntegrationErrors(handlePUT);
export const DELETE = withIntegrationErrors(handleDELETE);
