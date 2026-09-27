import crypto from "crypto";

export type TuyaRegion = "eu" | "us" | "cn" | "in";

const BASE_URLS: Record<TuyaRegion, string> = {
  eu: "https://openapi.tuyaeu.com",
  us: "https://openapi.tuyaus.com",
  cn: "https://openapi.tuyacn.com",
  in: "https://openapi.tuyain.com",
};

export type TuyaDevice = {
  id: string;
  name?: string;
  category?: string;
  product_id?: string;
  product_name?: string;
  online?: boolean;
  sub?: boolean;
  time_zone?: string;
};

export class TuyaConnector {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;
  private accessToken = "";
  private tokenExpiry = 0;

  constructor(clientId: string, clientSecret: string, region: TuyaRegion = "eu") {
    this.clientId = clientId.trim();
    this.clientSecret = clientSecret.trim();
    this.baseUrl = BASE_URLS[region] || BASE_URLS.eu;

    if (!this.clientId || !this.clientSecret) {
      throw new Error("Tuya client ID and access secret are required");
    }
  }

  private decryptTicketKey(ticketKeyHex: string): Buffer {
    const encrypted = Buffer.from(ticketKeyHex, "hex");
    if (!encrypted.length) throw new Error("Tuya returned an invalid password ticket");

    const secretUtf8 = Buffer.from(this.clientSecret, "utf8");
    let algorithm: "aes-128-ecb" | "aes-192-ecb" | "aes-256-ecb";
    let key: Buffer;

    if (secretUtf8.length === 16) {
      algorithm = "aes-128-ecb";
      key = secretUtf8;
    } else if (secretUtf8.length === 24) {
      algorithm = "aes-192-ecb";
      key = secretUtf8;
    } else if (secretUtf8.length === 32) {
      algorithm = "aes-256-ecb";
      key = secretUtf8;
    } else if (/^[0-9a-fA-F]{32}$/.test(this.clientSecret)) {
      algorithm = "aes-128-ecb";
      key = Buffer.from(this.clientSecret, "hex");
    } else {
      throw new Error("Unsupported Tuya access secret length");
    }

    const decipher = crypto.createDecipheriv(algorithm, key, null);
    decipher.setAutoPadding(true);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    if (decrypted.length !== 16) {
      throw new Error(`Unexpected Tuya ticket key length: ${decrypted.length}`);
    }

    return decrypted;
  }

  private encryptPassword(password: string, ticketKeyHex: string): string {
    if (!/^\d{6,7}$/.test(password)) {
      throw new Error("Tuya temporary password must contain 6 or 7 digits");
    }

    const ticketKey = this.decryptTicketKey(ticketKeyHex);
    const cipher = crypto.createCipheriv("aes-128-ecb", ticketKey, null);
    cipher.setAutoPadding(true);
    return Buffer.concat([cipher.update(password, "utf8"), cipher.final()])
      .toString("hex")
      .toUpperCase();
  }

  private async request(method: string, path: string, body?: unknown) {
    const t = Date.now().toString();
    const bodyStr = body === undefined ? "" : JSON.stringify(body);
    const contentHash = crypto.createHash("sha256").update(bodyStr).digest("hex");
    const stringToSign = `${method}\n${contentHash}\n\n${path}`;
    const tokenPart = this.accessToken || "";
    const signPayload = this.clientId + tokenPart + t + stringToSign;
    const sign = crypto
      .createHmac("sha256", this.clientSecret)
      .update(signPayload, "utf8")
      .digest("hex")
      .toUpperCase();

    const headers: Record<string, string> = {
      client_id: this.clientId,
      sign,
      sign_method: "HMAC-SHA256",
      t,
      "Content-Type": "application/json",
    };

    if (this.accessToken) headers.access_token = this.accessToken;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch(this.baseUrl + path, {
        method,
        headers,
        body: body === undefined ? undefined : bodyStr,
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(`Tuya API error ${data?.code || response.status}: ${data?.msg || response.statusText}`);
      }

      return data.result;
    } finally {
      clearTimeout(timeout);
    }
  }

  async getAccessToken() {
    if (this.accessToken && Date.now() < this.tokenExpiry) return this.accessToken;

    const result = await this.request("GET", "/v1.0/token?grant_type=1");
    this.accessToken = result.access_token;
    this.tokenExpiry = Date.now() + Number(result.expire_time || 0) * 1000 - 60_000;
    return this.accessToken;
  }

  async testConnection() {
    await this.getAccessToken();
    return { ok: true };
  }

  async listDevices(page = 1, pageSize = 100): Promise<TuyaDevice[]> {
    await this.getAccessToken();
    const result = await this.request("GET", `/v1.0/devices?page_no=${page}&page_size=${pageSize}`);

    if (Array.isArray(result)) return result;
    if (Array.isArray(result?.list)) return result.list;
    if (Array.isArray(result?.devices)) return result.devices;
    return [];
  }

  async getDevice(deviceId: string): Promise<TuyaDevice> {
    await this.getAccessToken();
    return await this.request("GET", `/v1.0/devices/${encodeURIComponent(deviceId)}`);
  }

  private async getPasswordTicket(deviceId: string) {
    await this.getAccessToken();
    return await this.request("POST", `/v1.0/devices/${encodeURIComponent(deviceId)}/door-lock/password-ticket`);
  }

  async getTemporaryPasswords(deviceId: string) {
    await this.getAccessToken();
    return await this.request("GET", `/v1.0/devices/${encodeURIComponent(deviceId)}/door-lock/temp-passwords`);
  }

  async deleteTemporaryPassword(deviceId: string, passwordId: string | number) {
    await this.getAccessToken();
    return await this.request(
      "DELETE",
      `/v1.0/devices/${encodeURIComponent(deviceId)}/door-lock/temp-passwords/${encodeURIComponent(String(passwordId))}`
    );
  }

  async generateTempCode(
    deviceId: string,
    password: string,
    name: string,
    start: Date,
    end: Date
  ) {
    if (end <= start) throw new Error("Temporary code end time must be after start time");

    const ticket = await this.getPasswordTicket(deviceId);
    const encryptedPassword = this.encryptPassword(password, ticket.ticket_key);

    const result = await this.request(
      "POST",
      `/v1.0/devices/${encodeURIComponent(deviceId)}/door-lock/temp-password`,
      {
        password: encryptedPassword,
        ticket_id: ticket.ticket_id,
        name: String(name || "Guest").slice(0, 50),
        effective_time: Math.floor(start.getTime() / 1000),
        invalid_time: Math.floor(end.getTime() / 1000),
        password_type: "ticket",
      }
    );

    return {
      success: true,
      code: password,
      validFrom: start,
      validUntil: end,
      providerPasswordId: result?.id ?? result?.password_id ?? null,
      result,
    };
  }
}
