const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function moduleFrom(file, mocks) {
  const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, {
    module, exports: module.exports, console, Date, Set, URL,
    require: name => Object.hasOwn(mocks, name) ? mocks[name] : require(name),
  }, { filename: file });
  return module.exports;
}

function database(rows, failure) {
  const writes = [];
  const admin = { from(table) {
    let operation = 'read';
    let payload;
    let filters = [];
    let single = false;
    let throwErrors = false;
    const query = new Proxy({}, { get(_, method) {
      if (method === 'then') return (resolve, reject) => {
        try {
          if (failure?.(table, operation)) throw new Error('Simulated storage failure');
          let matches = (rows[table] || []).filter(row => filters.every(([key, value]) => row[key] === value));
          if (operation !== 'read') {
            writes.push({ table, operation, payload });
            const values = Array.isArray(payload) ? payload : [payload];
            if (operation === 'upsert') {
              const key = table === 'property_connections' ? 'property_id' : 'integration_id';
              const existing = (rows[table] || []).find(row => row[key] === values[0][key]);
              if (existing) Object.assign(existing, values[0]);
              else (rows[table] ||= []).push({ ...values[0] });
              matches = rows[table];
            } else if (operation === 'insert') {
              matches = values.map(value => ({ id: 'created-id', ...value }));
              (rows[table] ||= []).push(...matches);
            } else if (operation === 'update') {
              matches.forEach(row => Object.assign(row, payload));
            }
          }
          resolve({ data: single ? matches[0] || null : matches, error: null });
        } catch (error) {
          if (throwErrors) reject(error);
          else resolve({ data: null, error });
        }
      };
      return (...args) => {
        if (['insert', 'upsert', 'update', 'delete'].includes(method)) { operation = method; payload = args[0]; }
        if (method === 'eq') filters.push(args);
        if (['single', 'maybeSingle'].includes(method)) single = true;
        if (method === 'throwOnError') throwErrors = true;
        return query;
      };
    } });
    return query;
  } };
  return { admin, writes };
}

const guideId = '11111111-1111-4111-8111-111111111111';
const propertyId = '22222222-2222-4222-8222-222222222222';
const next = { NextResponse: { json: (body, options) => Response.json(body, options) } };
const errors = moduleFrom('src/lib/integrations/route-errors.ts', { 'next/server': next });
const request = (body, query = '') => new Request('https://maplyo.test/api/integrations' + query, {
  method: body ? 'POST' : 'GET', headers: { Authorization: 'Bearer test', 'Content-Type': 'application/json' },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

async function run() {
  let active;
  let invalidCalendar = false;
  const server = {
    getIntegrationAdmin: () => active.admin,
    requireIntegrationUser: async () => ({ ok: true, user: { id: 'owner' } }),
    getOwnedPropertyFromGuide: async () => ({ propertyId, property: { name: 'Apartment A' } }),
    getPropertyConnection: async (admin, id) => (await admin.from('property_connections').select('*').eq('property_id', id).maybeSingle().throwOnError()).data,
  };
  const common = { 'next/server': next, '@/lib/integrations/server': server, '@/lib/integrations/route-errors': errors };
  const airbnb = moduleFrom('src/app/api/integrations/airbnb/route.ts', { ...common,
    '@/lib/integrations/ical': { isAllowedAirbnbCalendarUrl: () => true, parseAirbnbCalendar: async () => {
      if (invalidCalendar) throw new Error('Invalid calendar');
      return [];
    } },
  });
  const url = 'https://www.airbnb.com/calendar/ical/test.ics';
  active = database({}, (table, op) => table === 'property_connections' && op === 'upsert');
  assert.equal((await airbnb.POST(request({ guideId, icalUrl: url }))).status, 400);
  assert.equal(active.writes.length, 0, 'failed persistence cannot return a successful connection');

  active = database({ property_connections: [{ property_id: propertyId, airbnb_ical_url: url, tuya_device_id: 'lock-a', tuya_code_length: 7 }] });
  invalidCalendar = true;
  assert.equal((await airbnb.POST(request({ guideId, icalUrl: url + '?replacement' }))).status, 400);
  assert.equal(active.writes.length, 0, 'invalid replacement must preserve the saved calendar');
  invalidCalendar = false;
  assert.equal((await airbnb.POST(request({ guideId, icalUrl: url }))).status, 200);
  const restored = await (await airbnb.GET(request(null, '?guideId=' + guideId))).json();
  assert.equal(restored.connected, true);
  assert.equal(restored.tuyaDeviceId, 'lock-a', 'calendar updates must preserve the property lock');
  assert.equal(restored.tuyaCodeLength, 7);
  active = database({}, table => table === 'property_connections');
  assert.equal((await airbnb.GET(request(null, '?guideId=' + guideId))).status, 503, 'read failure is not a disconnected account');

  let cannotEncrypt = false;
  const tuya = moduleFrom('src/app/api/integrations/tuya/route.ts', { ...common,
    '@/lib/integrations/tuya': { TuyaConnector: class {
      async testConnection() {} async listDevices() { return []; }
      async getDevice(id) { return { id, name: 'Apartment lock' }; }
    } },
    '@/lib/integrations/secrets': {
      encryptIntegrationSecret: () => {
        if (cannotEncrypt) throw new Error('Encryption key missing');
        return { ciphertext: 'cipher', iv: 'iv', authTag: 'tag', keyVersion: 1 };
      },
      decryptIntegrationSecret: () => ({ accessId: 'account-id', accessSecret: 'secret-value', region: 'eu' }),
    },
  });
  const credentials = { accessId: 'account-id', accessSecret: 'secret-value', region: 'eu' };
  active = database({}); cannotEncrypt = true;
  assert.equal((await tuya.POST(request(credentials))).status, 400);
  assert.equal(active.writes.length, 0, 'missing encryption key must not create an account row');
  cannotEncrypt = false;
  active = database({ integrations: [{ id: 'account', user_id: 'owner', type: 'tuya', credentials: { accessId: 'old-id', accessSecret: 'old-secret' } }] }, (table, op) => table === 'integration_secrets' && op === 'upsert');
  assert.equal((await tuya.POST(request(credentials))).status, 400);
  assert.equal(active.writes.length, 0, 'failed secret save must not erase legacy credentials');

  const rows = { integrations: [{ id: 'account', user_id: 'owner', type: 'tuya' }], integration_secrets: [{ integration_id: 'account', ciphertext: 'cipher' }] };
  active = database(rows, (table, op) => table === 'property_connections' && op === 'upsert');
  assert.equal((await tuya.PUT(request({ guideId, deviceId: 'lock-a', codeLength: 7 }))).status, 400);
  active = database(rows);
  assert.equal((await tuya.PUT(request({ guideId, deviceId: 'lock-a', codeLength: 7 }))).status, 200);
  assert.equal(rows.property_connections[0].tuya_device_id, 'lock-a');
  assert.equal(rows.property_connections[0].tuya_code_length, 7);

  let revokeFails = false;
  const sync = moduleFrom('src/lib/integrations/airbnb-sync-engine.ts', {
    '@/lib/integrations/ical': { parseAirbnbCalendar: async () => [] },
    '@/lib/integrations/secrets': { decryptIntegrationSecret: () => credentials },
    '@/lib/integrations/tuya': { TuyaConnector: class {
      async testConnection() {}
      async deleteTemporaryPassword() { if (revokeFails) throw new Error('Lock offline'); }
    } },
  });
  const cancelled = {
    guides: [{ id: guideId, user_id: 'owner', property_id: propertyId }],
    properties: [{ id: propertyId, organization_id: 'workspace' }],
    property_connections: [{ property_id: propertyId, airbnb_ical_url: url, tuya_device_id: 'lock-a', tuya_integration_id: 'account' }],
    integrations: rows.integrations, integration_secrets: rows.integration_secrets,
    access_codes: [{ id: 'code', guide_id: guideId, source: 'airbnb', external_uid: 'cancelled-reservation', provider_password_id: 'password', status: 'active' }],
    stays: [{ id: 'stay', property_id: propertyId, source: 'airbnb_ical', external_reservation_id: 'cancelled-reservation', status: 'confirmed' }],
  };
  active = database(cancelled); revokeFails = true;
  const failedRevoke = await sync.runAirbnbGuideSync({ admin: active.admin, userId: 'owner', guideId });
  assert.equal(failedRevoke.codeFailures, 1);
  assert.equal(failedRevoke.cancelledCodes, 0);
  assert.equal(failedRevoke.tuya.healthy, false);
  assert.equal(cancelled.access_codes[0].status, 'active', 'failed revocation must remain eligible for retry');
  revokeFails = false;
  const retried = await sync.runAirbnbGuideSync({ admin: active.admin, userId: 'owner', guideId });
  assert.equal(retried.cancelledCodes, 1);
  assert.equal(cancelled.access_codes[0].status, 'cancelled');

  const booking = { uid: 'reservation', summary: 'Reserved', start: new Date('2027-01-01'), end: new Date('2027-01-03') };
  const staySync = moduleFrom('src/lib/integrations/airbnb-sync-engine.ts', {
    '@/lib/integrations/ical': { parseAirbnbCalendar: async () => [booking] },
    '@/lib/integrations/secrets': {}, '@/lib/integrations/tuya': {},
  });
  cancelled.property_connections[0].tuya_device_id = null;
  active = database(cancelled, (table, op) => table === 'stays' && op === 'insert');
  await assert.rejects(staySync.runAirbnbGuideSync({ admin: active.admin, userId: 'owner', guideId }), /storage failure/);
  assert.equal(cancelled.property_connections[0].airbnb_status, 'error', 'failed stay writes must not report healthy sync');
  console.log('Integration persistence regression checks passed.');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
