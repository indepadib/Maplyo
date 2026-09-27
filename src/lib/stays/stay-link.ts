import { createHash, randomBytes } from "node:crypto";

export function hashStayToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createJourneyStayLink(input: {
  admin: any;
  stay: {
    id: string;
    organization_id: string;
    property_id: string;
    check_out_at: string;
  };
  guideId: string;
  origin: string;
}) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashStayToken(token);

  const checkout = new Date(input.stay.check_out_at).getTime();
  const minExpiry = Date.now() + 24 * 60 * 60 * 1000;
  const expiryMs = Number.isFinite(checkout)
    ? Math.max(checkout + 48 * 60 * 60 * 1000, minExpiry)
    : Date.now() + 30 * 24 * 60 * 60 * 1000;

  const { data, error } = await input.admin
    .from("stay_links")
    .insert([{
      organization_id: input.stay.organization_id,
      property_id: input.stay.property_id,
      stay_id: input.stay.id,
      guide_id: input.guideId,
      token_hash: tokenHash,
      expires_at: new Date(expiryMs).toISOString(),
    }])
    .select("id, expires_at")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Could not create stay link");
  }

  return {
    id: data.id,
    url: input.origin.replace(/\/$/, "") + "/s/" + token,
    expiresAt: data.expires_at as string,
  };
}
