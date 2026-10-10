const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function moduleFrom(file, mocks) {
  const source = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, "..", file), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }
  ).outputText;

  const module = { exports: {} };
  vm.runInNewContext(source, {
    module,
    exports: module.exports,
    console,
    Date,
    Set,
    Map,
    URL,
    URLSearchParams,
    Buffer,
    process,
    require: (name) => Object.hasOwn(mocks, name) ? mocks[name] : require(name),
  }, { filename: file });

  return module.exports;
}

function schemaError(message = "Missing schema feature") {
  const error = new Error(message);
  error.code = "PGRST205";
  return error;
}

function database(rows, failure) {
  const writes = [];

  const admin = {
    from(table) {
      let operation = "read";
      let payload;
      let filters = [];
      let single = false;
      let throwErrors = false;

      const query = new Proxy({}, {
        get(_, method) {
          if (method === "then") {
            return (resolve, reject) => {
              try {
                const configuredFailure = failure?.(table, operation);
                if (configuredFailure) {
                  throw configuredFailure instanceof Error
                    ? configuredFailure
                    : new Error("Simulated storage failure");
                }

                let matches = (rows[table] || []).filter((row) =>
                  filters.every(([key, value]) => row[key] === value)
                );

                if (operation !== "read") {
                  const values = Array.isArray(payload) ? payload : [payload];
                  writes.push({ table, operation, payload });

                  if (operation === "upsert") {
                    const key =
                      table === "property_connections"
                        ? "property_id"
                        : table === "integration_secrets"
                          ? "integration_id"
                          : "id";

                    const existing = (rows[table] || []).find(
                      (row) => row[key] === values[0][key]
                    );

                    if (existing) Object.assign(existing, values[0]);
                    else (rows[table] ||= []).push({ ...values[0] });

                    matches = rows[table];
                  } else if (operation === "insert") {
                    matches = values.map((value, index) => ({
                      id: value.id || `created-${table}-${index}`,
                      ...value,
                    }));
                    (rows[table] ||= []).push(...matches);
                  } else if (operation === "update") {
                    matches.forEach((row) => Object.assign(row, payload));
                  } else if (operation === "delete") {
                    const survivors = (rows[table] || []).filter(
                      (row) => !filters.every(([key, value]) => row[key] === value)
                    );
                    rows[table] = survivors;
                    matches = [];
                  }
                }

                resolve({
                  data: single ? matches[0] || null : matches,
                  error: null,
                });
              } catch (error) {
                if (throwErrors) reject(error);
                else resolve({ data: null, error });
              }
            };
          }

          return (...args) => {
            if (["insert","upsert","update","delete"].includes(method)) {
              operation = method;
              payload = args[0];
            }
            if (method === "eq") filters.push(args);
            if (["single","maybeSingle"].includes(method)) single = true;
            if (method === "throwOnError") throwErrors = true;
            return query;
          };
        },
      });

      return query;
    },
  };

  return { admin, writes };
}

const guideId = "11111111-1111-4111-8111-111111111111";
const propertyId = "22222222-2222-4222-8222-222222222222";
const ownerId = "owner";
const workspaceId = "workspace";
const url = "https://www.airbnb.com/calendar/ical/test.ics";

const next = {
  NextResponse: {
    json: (body, options) => Response.json(body, options),
  },
};

const routeErrors = moduleFrom("src/lib/integrations/route-errors.ts", {
  "next/server": next,
});

const request = (body, query = "") =>
  new Request("https://maplyo.test/api/integrations" + query, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: "Bearer test",
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

async function run() {
  // Runtime configuration regression: integration APIs must still get a
  // Supabase client when an older Netlify site has no service-role key.
  const previousUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const previousAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const previousService = process.env.SUPABASE_SERVICE_ROLE_KEY;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-test-key";
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;

  const createdClients = [];
  const actualServer = moduleFrom("src/lib/integrations/server.ts", {
    "@supabase/supabase-js": {
      createClient: (url, key, options) => {
        const client = { url, key, options };
        createdClients.push(client);
        return client;
      },
    },
  });

  const rlsClient = actualServer.getIntegrationAdmin("Bearer user-token");
  assert.ok(rlsClient, "authenticated RLS fallback client must be created");
  assert.equal(createdClients[0].key, "anon-test-key");
  assert.equal(
    createdClients[0].options.global.headers.Authorization,
    "Bearer user-token"
  );

  if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  else process.env.NEXT_PUBLIC_SUPABASE_URL = previousUrl;
  if (previousAnon === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = previousAnon;
  if (previousService === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  else process.env.SUPABASE_SERVICE_ROLE_KEY = previousService;

  let active;
  let storageMode = "property";
  let invalidCalendar = false;
  let cannotEncrypt = false;
  let revokeFails = false;

  const getLegacyGuideConnection = async (admin, id) =>
    (
      await admin
        .from("guide_integrations")
        .select("*")
        .eq("guide_id", id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
        .throwOnError()
    ).data;

  const saveLegacyGuideConnection = async (
    admin,
    id,
    config,
    options = {}
  ) => {
    const existing = await getLegacyGuideConnection(admin, id);

    if (existing?.id) {
      const payload = { config };
      if ("integrationId" in options) {
        payload.integration_id = options.integrationId ?? null;
      }
      if ("externalId" in options) {
        payload.external_id = options.externalId ?? null;
      }

      await admin
        .from("guide_integrations")
        .update(payload)
        .eq("id", existing.id)
        .throwOnError();

      return existing.id;
    }

    const { data } = await admin
      .from("guide_integrations")
      .insert([{
        guide_id: id,
        integration_id: options.integrationId ?? null,
        external_id: options.externalId ?? null,
        config,
      }])
      .select("id")
      .single()
      .throwOnError();

    return data.id;
  };

  const server = {
    getIntegrationAdmin: () => active.admin,
    requireIntegrationUser: async () => ({
      ok: true,
      user: { id: ownerId },
    }),
    getOwnedPropertyFromGuide: async () =>
      storageMode === "property"
        ? {
            mode: "property",
            guideId,
            propertyId,
            organizationId: workspaceId,
            property: { id: propertyId, name: "Apartment A" },
          }
        : {
            mode: "legacy",
            guideId,
            propertyId: null,
            organizationId: null,
            property: { id: null, name: "Apartment A" },
          },
    getPropertyConnection: async (admin, id) =>
      (
        await admin
          .from("property_connections")
          .select("*")
          .eq("property_id", id)
          .maybeSingle()
          .throwOnError()
      ).data,
    getLegacyGuideConnection,
    saveLegacyGuideConnection,
    isSchemaCompatibilityError: (error) =>
      ["42P01","42703","PGRST204","PGRST205"].includes(
        String(error?.code || "")
      ),
  };

  const common = {
    "next/server": next,
    "@/lib/integrations/server": server,
    "@/lib/integrations/route-errors": routeErrors,
  };

  const airbnb = moduleFrom(
    "src/app/api/integrations/airbnb/route.ts",
    {
      ...common,
      "@/lib/integrations/ical": {
        isAllowedAirbnbCalendarUrl: () => true,
        parseAirbnbCalendar: async () => {
          if (invalidCalendar) throw new Error("Invalid calendar");
          return [];
        },
      },
    }
  );

  // Property-mode Airbnb save -> reload -> preserve lock assignment.
  storageMode = "property";
  active = database({
    property_connections: [{
      property_id: propertyId,
      tuya_device_id: "lock-a",
      tuya_device_name: "Apartment lock",
      tuya_code_length: 7,
    }],
  });

  assert.equal(
    (await airbnb.POST(request({ guideId, icalUrl: url }))).status,
    200
  );

  const propertyReload = await (
    await airbnb.GET(request(null, "?guideId=" + guideId))
  ).json();

  assert.equal(propertyReload.connected, true);
  assert.equal(propertyReload.storageMode, "property");
  assert.equal(propertyReload.tuyaDeviceId, "lock-a");
  assert.equal(propertyReload.tuyaCodeLength, 7);

  // Invalid replacement must preserve saved state.
  invalidCalendar = true;
  const beforeInvalid = JSON.stringify(active.admin && active.writes);
  assert.equal(
    (await airbnb.POST(request({ guideId, icalUrl: url + "?bad" }))).status,
    400
  );
  assert.equal(JSON.stringify(active.writes), beforeInvalid);
  invalidCalendar = false;

  // Property persistence failure must not look successful.
  active = database(
    {},
    (table, operation) =>
      table === "property_connections" && operation === "upsert"
  );
  assert.equal(
    (await airbnb.POST(request({ guideId, icalUrl: url }))).status,
    400
  );

  // Legacy-mode Airbnb save -> reload.
  storageMode = "legacy";
  active = database({ guide_integrations: [] });

  assert.equal(
    (await airbnb.POST(request({ guideId, icalUrl: url }))).status,
    200
  );

  const legacyReload = await (
    await airbnb.GET(request(null, "?guideId=" + guideId))
  ).json();

  assert.equal(legacyReload.connected, true);
  assert.equal(legacyReload.storageMode, "legacy");
  assert.equal(
    active.writes.some((write) => write.table === "guide_integrations"),
    true
  );

  const tuya = moduleFrom(
    "src/app/api/integrations/tuya/route.ts",
    {
      ...common,
      "@/lib/integrations/tuya": {
        TuyaConnector: class {
          async testConnection() {}
          async listDevices() {
            return [{ id: "lock-a", name: "Apartment lock", online: true }];
          }
          async getDevice(id) {
            return { id, name: id === "lock-b" ? "Second lock" : "Apartment lock" };
          }
        },
      },
      "@/lib/integrations/secrets": {
        encryptIntegrationSecret: () => {
          if (cannotEncrypt) throw new Error("Encryption key missing");
          return {
            ciphertext: "cipher",
            iv: "iv",
            authTag: "tag",
            keyVersion: 1,
          };
        },
        decryptIntegrationSecret: () => ({
          accessId: "account-id",
          accessSecret: "secret-value",
          region: "eu",
        }),
      },
    }
  );

  const credentials = {
    accessId: "account-id",
    accessSecret: "secret-value",
    region: "eu",
  };

  // Encryption failure cannot create partial connection rows.
  storageMode = "property";
  active = database({});
  cannotEncrypt = true;
  assert.equal((await tuya.POST(request(credentials))).status, 400);
  assert.equal(active.writes.length, 0);
  cannotEncrypt = false;

  // Legacy DB without integration_secrets falls back to encrypted JSONB.
  active = database(
    {
      integrations: [{
        id: "account",
        user_id: ownerId,
        type: "tuya",
        credentials: {},
        settings: {},
        status: "active",
      }],
    },
    (table, operation) =>
      table === "integration_secrets" && operation === "upsert"
        ? schemaError()
        : false
  );

  assert.equal((await tuya.POST(request(credentials))).status, 200);
  assert.equal(
    Boolean(active.admin && active.writes.find(
      (write) =>
        write.table === "integrations" &&
        write.operation === "update" &&
        write.payload?.credentials?.encrypted_v1
    )),
    true
  );

  // Property-mode lock assignment.
  const propertyRows = {
    integrations: [{
      id: "account",
      user_id: ownerId,
      type: "tuya",
      credentials: {},
      settings: {},
    }],
    integration_secrets: [{
      integration_id: "account",
      ciphertext: "cipher",
      iv: "iv",
      auth_tag: "tag",
    }],
    property_connections: [{ property_id: propertyId }],
  };

  active = database(propertyRows);
  storageMode = "property";

  assert.equal(
    (
      await tuya.PUT(
        request({ guideId, deviceId: "lock-a", codeLength: 7 })
      )
    ).status,
    200
  );
  assert.equal(propertyRows.property_connections[0].tuya_device_id, "lock-a");
  assert.equal(propertyRows.property_connections[0].tuya_code_length, 7);

  // Legacy-mode lock assignment must coexist with the saved iCal.
  const legacyRows = {
    integrations: propertyRows.integrations,
    integration_secrets: propertyRows.integration_secrets,
    guide_integrations: [{
      id: "legacy-link",
      guide_id: guideId,
      integration_id: null,
      external_id: null,
      config: { icalUrl: url },
    }],
  };

  active = database(legacyRows);
  storageMode = "legacy";

  assert.equal(
    (
      await tuya.PUT(
        request({ guideId, deviceId: "lock-b", codeLength: 6 })
      )
    ).status,
    200
  );
  assert.equal(legacyRows.guide_integrations[0].config.icalUrl, url);
  assert.equal(
    legacyRows.guide_integrations[0].config.tuyaDeviceId,
    "lock-b"
  );
  assert.equal(legacyRows.guide_integrations[0].integration_id, "account");

  // Property-mode sync cancellation: failed Tuya revocation remains retryable.
  storageMode = "property";
  const cancelled = {
    property_connections: [{
      property_id: propertyId,
      airbnb_ical_url: url,
      tuya_device_id: "lock-a",
      tuya_integration_id: "account",
      tuya_code_length: 7,
    }],
    integrations: propertyRows.integrations,
    integration_secrets: propertyRows.integration_secrets,
    access_codes: [{
      id: "code",
      guide_id: guideId,
      source: "airbnb",
      external_uid: "cancelled-reservation",
      provider_password_id: "password",
      status: "active",
    }],
    stays: [{
      id: "stay",
      property_id: propertyId,
      source: "airbnb_ical",
      external_reservation_id: "cancelled-reservation",
      status: "confirmed",
    }],
  };

  const sync = moduleFrom(
    "src/lib/integrations/airbnb-sync-engine.ts",
    {
      "@/lib/integrations/server": server,
      "@/lib/integrations/ical": {
        parseAirbnbCalendar: async () => [],
      },
      "@/lib/integrations/secrets": {
        decryptIntegrationSecret: () => credentials,
      },
      "@/lib/integrations/tuya": {
        TuyaConnector: class {
          async testConnection() {}
          async deleteTemporaryPassword() {
            if (revokeFails) throw new Error("Lock offline");
          }
        },
      },
    }
  );

  active = database(cancelled);
  revokeFails = true;

  const failedRevoke = await sync.runAirbnbGuideSync({
    admin: active.admin,
    userId: ownerId,
    guideId,
  });

  assert.equal(failedRevoke.codeFailures, 1);
  assert.equal(failedRevoke.cancelledCodes, 0);
  assert.equal(cancelled.access_codes[0].status, "active");

  revokeFails = false;
  const retried = await sync.runAirbnbGuideSync({
    admin: active.admin,
    userId: ownerId,
    guideId,
  });

  assert.equal(retried.cancelledCodes, 1);
  assert.equal(cancelled.access_codes[0].status, "cancelled");

  // Property-mode stay failure must report sync error.
  const booking = {
    uid: "reservation",
    summary: "Reserved",
    start: new Date("2027-01-01"),
    end: new Date("2027-01-03"),
  };

  const staySync = moduleFrom(
    "src/lib/integrations/airbnb-sync-engine.ts",
    {
      "@/lib/integrations/server": server,
      "@/lib/integrations/ical": {
        parseAirbnbCalendar: async () => [booking],
      },
      "@/lib/integrations/secrets": {},
      "@/lib/integrations/tuya": {},
    }
  );

  cancelled.property_connections[0].tuya_device_id = null;
  active = database(
    cancelled,
    (table, operation) =>
      table === "stays" && operation === "insert"
  );

  await assert.rejects(
    staySync.runAirbnbGuideSync({
      admin: active.admin,
      userId: ownerId,
      guideId,
    }),
    /storage failure/i
  );

  assert.equal(
    cancelled.property_connections[0].airbnb_status,
    "error"
  );

  // Legacy-mode sync must not require hospitality guests/stays tables.
  storageMode = "legacy";
  const legacySyncRows = {
    guide_integrations: [{
      id: "legacy-sync-link",
      guide_id: guideId,
      integration_id: null,
      external_id: null,
      config: { icalUrl: url },
    }],
    access_codes: [],
  };

  active = database(legacySyncRows);

  const legacySync = moduleFrom(
    "src/lib/integrations/airbnb-sync-engine.ts",
    {
      "@/lib/integrations/server": server,
      "@/lib/integrations/ical": {
        parseAirbnbCalendar: async () => [booking],
      },
      "@/lib/integrations/secrets": {},
      "@/lib/integrations/tuya": {},
    }
  );

  const legacyResult = await legacySync.runAirbnbGuideSync({
    admin: active.admin,
    userId: ownerId,
    guideId,
  });

  assert.equal(legacyResult.storageMode, "legacy");
  assert.equal(legacyResult.staysSynced, 0);
  assert.equal(legacyResult.accessCodesSynced, 1);
  assert.equal(
    legacySyncRows.guide_integrations[0].config.airbnbSyncStatus,
    "healthy"
  );

  console.log(
    "Integration persistence regression checks passed for property and legacy schemas."
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
