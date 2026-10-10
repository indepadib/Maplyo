import { resolve4, resolve6 } from "node:dns/promises";
import { isIP } from "node:net";

export interface WebsiteImportResult {
  dataText: string;
  propertyName?: string;
  city?: string;
  description?: string;
  coverImageUrl?: string;
  amenities?: string[];
  sourceUrl: string;
  imported: boolean;
  warning?: string;
}

function isPrivateIPv4(ip: string) {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return true;
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

function isPrivateIPv6(ip: string) {
  const normalized = ip.toLowerCase();
  return (
    normalized === "::" ||
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe8") ||
    normalized.startsWith("fe9") ||
    normalized.startsWith("fea") ||
    normalized.startsWith("feb") ||
    normalized.startsWith("::ffff:127.") ||
    normalized.startsWith("::ffff:10.") ||
    normalized.startsWith("::ffff:192.168.") ||
    normalized.startsWith("::ffff:169.254.")
  );
}

function isPublicIp(ip: string) {
  const version = isIP(ip);
  if (version === 4) return !isPrivateIPv4(ip);
  if (version === 6) return !isPrivateIPv6(ip);
  return false;
}

async function validatePublicUrl(rawUrl: string) {
  const url = new URL(rawUrl);

  if (url.protocol !== "https:") throw new Error("Only HTTPS property websites are supported.");
  if (url.username || url.password) throw new Error("Credentials in URLs are not supported.");
  if (url.port && url.port !== "443") throw new Error("Custom website ports are not supported.");

  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  if (!hostname || hostname === "localhost" || hostname.endsWith(".local") || hostname.endsWith(".internal")) {
    throw new Error("Private or local websites are not supported.");
  }

  if (isIP(hostname)) {
    if (!isPublicIp(hostname)) throw new Error("Private IP addresses are not supported.");
    return url;
  }

  const addresses = [
    ...(await resolve4(hostname).catch(() => [])),
    ...(await resolve6(hostname).catch(() => [])),
  ];

  if (!addresses.length || addresses.some((ip) => !isPublicIp(ip))) {
    throw new Error("The property website does not resolve to a public address.");
  }

  return url;
}

async function fetchPublicHtml(rawUrl: string) {
  let current = await validatePublicUrl(rawUrl);

  for (let redirects = 0; redirects <= 3; redirects += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    try {
      const response = await fetch(current, {
        method: "GET",
        redirect: "manual",
        cache: "no-store",
        signal: controller.signal,
        headers: {
          "User-Agent": "Maplyo-Property-Importer/1.0 (+https://maplyo.com)",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "fr-FR,fr;q=0.8,en;q=0.6",
        },
      });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location) throw new Error("Website redirect is missing a destination.");
        current = await validatePublicUrl(new URL(location, current).toString());
        continue;
      }

      if (!response.ok) throw new Error(`Website returned HTTP ${response.status}.`);

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
        throw new Error("The supplied URL is not an HTML page.");
      }

      const declaredLength = Number(response.headers.get("content-length") || 0);
      if (declaredLength > 2_000_000) throw new Error("The property webpage is too large to import.");

      const html = (await response.text()).slice(0, 2_000_000);
      return { html, finalUrl: current.toString() };
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error("Too many website redirects.");
}

function firstMeta(html: string, attribute: "name" | "property", key: string) {
  const pattern = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${key.replace(/[.*+?^$\{\}()|[\\]\\]/g, "\\$&")}["'][^>]*content=["']([^"']+)["'][^>]*>`,
    "i"
  );
  const reversePattern = new RegExp(
    `<meta\\s+[^>]*content=["']([^"']+)["'][^>]*${attribute}=["']${key.replace(/[.*+?^$\{\}()|[\\]\\]/g, "\\$&")}["'][^>]*>`,
    "i"
  );
  return html.match(pattern)?.[1] || html.match(reversePattern)?.[1];
}

function extractMetadata(html: string, sourceUrl: string): WebsiteImportResult {
  let propertyName = firstMeta(html, "property", "og:title");
  let description = firstMeta(html, "property", "og:description") || firstMeta(html, "name", "description");
  let coverImageUrl = firstMeta(html, "property", "og:image");
  let city: string | undefined;
  const amenities: string[] = [];

  if (!propertyName) {
    propertyName = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim();
  }

  const summaries: Record<string, unknown>[] = [];
  const jsonLdRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  let count = 0;

  const walk = (value: any, visitor: (node: any) => void) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach((item) => walk(item, visitor));
      return;
    }
    visitor(value);
    Object.values(value).forEach((child) => walk(child, visitor));
  };

  while ((match = jsonLdRegex.exec(html)) && count < 8) {
    try {
      const parsed = JSON.parse(match[1].trim());
      walk(parsed, (node) => {
        if (!propertyName && typeof node.name === "string") propertyName = node.name.trim();
        if (!description && typeof node.description === "string") description = node.description.trim();
        if (!city && typeof node.addressLocality === "string") city = node.addressLocality.trim();

        if (!coverImageUrl) {
          if (typeof node.image === "string" && node.image.startsWith("http")) coverImageUrl = node.image;
          else if (typeof node.image?.url === "string") coverImageUrl = node.image.url;
        }

        if (Array.isArray(node.amenityFeature)) {
          node.amenityFeature.forEach((feature: any) => {
            if (typeof feature?.name === "string" && feature.name.trim()) amenities.push(feature.name.trim());
          });
        }

        if (node["@type"] && (node.name || node.address || node.description)) {
          summaries.push({
            type: node["@type"],
            name: typeof node.name === "string" ? node.name : undefined,
            address: node.address,
            description: typeof node.description === "string" ? node.description.slice(0, 350) : undefined,
          });
        }
      });
      count += 1;
    } catch {
      // Ignore malformed JSON-LD.
    }
  }

  const uniqueAmenities = [...new Set(amenities)].slice(0, 20);
  const dataText = [
    propertyName ? `Property name: ${propertyName}` : "",
    city ? `City: ${city}` : "",
    description ? `Description: ${description.slice(0, 1000)}` : "",
    uniqueAmenities.length ? `Amenities: ${uniqueAmenities.join(", ")}` : "",
    summaries.length ? `Structured data: ${JSON.stringify(summaries.slice(0, 12))}` : "",
  ].filter(Boolean).join("\n");

  return {
    dataText: dataText.slice(0, 12000),
    propertyName,
    city,
    description,
    coverImageUrl,
    amenities: uniqueAmenities,
    sourceUrl,
    imported: Boolean(propertyName || description || city || coverImageUrl),
  };
}

export async function importPropertyWebsite(rawUrl: string, sourceOwnerConfirmed: boolean): Promise<WebsiteImportResult> {
  if (!sourceOwnerConfirmed) {
    throw new Error("You must confirm that you own, manage, or are authorized to use this property website information.");
  }

  try {
    const { html, finalUrl } = await fetchPublicHtml(rawUrl);
    return extractMetadata(html, finalUrl);
  } catch (error: any) {
    return {
      dataText: "",
      sourceUrl: rawUrl,
      imported: false,
      warning: error?.message || "Website import was unavailable. Continue with manual property details.",
    };
  }
}
