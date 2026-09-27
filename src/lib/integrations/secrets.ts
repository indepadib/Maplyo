import crypto from "node:crypto";

type EncryptedSecret = {
  ciphertext: string;
  iv: string;
  authTag: string;
  keyVersion: number;
};

function getKey() {
  const source = process.env.MAPLYO_INTEGRATION_ENCRYPTION_KEY;
  if (!source || source.trim().length < 24) {
    throw new Error("MAPLYO_INTEGRATION_ENCRYPTION_KEY is not configured");
  }
  return crypto.createHash("sha256").update(source, "utf8").digest();
}

export function encryptIntegrationSecret(value: unknown): EncryptedSecret {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const plaintext = Buffer.from(JSON.stringify(value), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
    keyVersion: 1,
  };
}

export function decryptIntegrationSecret<T = any>(secret: {
  ciphertext: string;
  iv: string;
  auth_tag?: string;
  authTag?: string;
}): T {
  const authTag = secret.auth_tag || secret.authTag;
  if (!authTag) throw new Error("Encrypted integration secret is incomplete");

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    getKey(),
    Buffer.from(secret.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(authTag, "base64"));

  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(secret.ciphertext, "base64")),
    decipher.final(),
  ]);

  return JSON.parse(plaintext.toString("utf8")) as T;
}
