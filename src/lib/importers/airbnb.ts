export interface AirbnbImportResult {
  dataText: string;
  listingName?: string;
  city?: string;
  description?: string;
  coverImageUrl?: string;
  latitude?: string;
  longitude?: string;
  amenities?: string[];
  sourceUrl: string;
  imported: boolean;
  warning?: string;
}

function isAllowedAirbnbUrl(rawUrl: string): boolean {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:") return false;
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    return /^airbnb\.(com|[a-z]{2,3}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(hostname);
  } catch {
    return false;
  }
}

async function fetchAirbnbHtml(url: string): Promise<string> {
  if (!isAllowedAirbnbUrl(url)) {
    throw new Error("Please provide a valid HTTPS Airbnb listing URL.");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Maplyo-Property-Importer/1.0 (+https://maplyo.com)",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "fr-FR,fr;q=0.8,en;q=0.6",
      },
      redirect: "follow",
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) return "";

    const finalUrl = response.url || url;
    if (!isAllowedAirbnbUrl(finalUrl)) {
      throw new Error("Airbnb import redirected to an unsupported destination.");
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return "";

    const text = await response.text();
    return text.slice(0, 2_000_000);
  } finally {
    clearTimeout(timeoutId);
  }
}

function extractAirbnbMetadata(html: string, sourceUrl: string): AirbnbImportResult {
  if (!html) {
    return {
      dataText: "",
      sourceUrl,
      imported: false,
      warning: "Airbnb did not return importable public listing metadata. The host can continue with city/manual details.",
    };
  }

  let dataText = "";
  let listingName: string | undefined;
  let city: string | undefined;
  let description: string | undefined;
  let coverImageUrl: string | undefined;
  let latitude: string | undefined;
  let longitude: string | undefined;
  const amenities: string[] = [];

  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    dataText += `Title: ${titleMatch[1]}\n`;
    const cityFromTitle = titleMatch[1].match(/[àin]+\s+([A-ZÀ-Ö][a-zA-ZÀ-ÿ\-\s]+?)(?:,|\s+-\s+Airbnb)/i);
    if (cityFromTitle) city = cityFromTitle[1].trim();
  }

  const ogImageMatch = html.match(/<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogImageMatch) coverImageUrl = ogImageMatch[1];

  const metaDescMatch = html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (metaDescMatch) {
    description = metaDescMatch[1];
    dataText += `Meta description: ${description}\n`;
  }

  const metaPropertyRegex = /<meta\s+[^>]*property=["']og:(title|description)["'][^>]*content=["']([^"']+)["']/gi;
  let match;
  while ((match = metaPropertyRegex.exec(html)) !== null) {
    dataText += `Meta og:${match[1]}: ${match[2]}\n`;
  }

  const jsonLdRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let ldMatch;
  let count = 0;

  while ((ldMatch = jsonLdRegex.exec(html)) !== null && count < 5) {
    try {
      const parsed = JSON.parse(ldMatch[1].trim());

      const findStr = (obj: any, key: string): string | undefined => {
        if (!obj || typeof obj !== "object") return undefined;
        if (Array.isArray(obj)) {
          for (const item of obj) {
            const value = findStr(item, key);
            if (value) return value;
          }
          return undefined;
        }
        if (key in obj && typeof obj[key] === "string" && obj[key].trim()) return obj[key].trim();
        for (const childKey of Object.keys(obj)) {
          const value = findStr(obj[childKey], key);
          if (value) return value;
        }
        return undefined;
      };

      if (!listingName) listingName = findStr(parsed, "name");
      if (!city) city = findStr(parsed, "addressLocality");
      if (!description && typeof parsed.description === "string") description = parsed.description.slice(0, 600);
      if (!latitude) latitude = findStr(parsed, "latitude");
      if (!longitude) longitude = findStr(parsed, "longitude");

      if (!coverImageUrl && parsed.image) {
        if (typeof parsed.image === "string" && parsed.image.startsWith("http")) {
          coverImageUrl = parsed.image;
        } else if (Array.isArray(parsed.image)) {
          const firstImg = parsed.image.find((img: any) =>
            typeof img === "string"
              ? img.startsWith("http")
              : img?.url?.startsWith("http") || img?.contentUrl?.startsWith("http")
          );
          if (firstImg) coverImageUrl = typeof firstImg === "string" ? firstImg : firstImg.url || firstImg.contentUrl;
        }
      }

      const extractAmenities = (obj: any): string[] => {
        const items: string[] = [];
        if (!obj) return items;
        if (Array.isArray(obj)) {
          for (const item of obj) items.push(...extractAmenities(item));
        } else if (typeof obj === "object") {
          if (typeof obj.name === "string") items.push(obj.name);
          if (obj.amenityFeature) items.push(...extractAmenities(obj.amenityFeature));
          if (obj.containsPlace) items.push(...extractAmenities(obj.containsPlace));
        }
        return items;
      };

      amenities.push(...extractAmenities(parsed.amenityFeature || parsed.containsPlace));

      const summary: Record<string, unknown> = {};
      if (parsed.name) summary.name = parsed.name;
      if (parsed.description) summary.description = String(parsed.description).slice(0, 400);
      if (parsed.address) summary.address = parsed.address;
      if (parsed.latitude) summary.latitude = parsed.latitude;
      if (parsed.longitude) summary.longitude = parsed.longitude;
      if (amenities.length) summary.amenities = amenities.slice(0, 15);
      dataText += `JSON-LD Summary:\n${JSON.stringify(summary, null, 2)}\n`;
      count += 1;
    } catch {
      // Ignore malformed structured-data blocks.
    }
  }

  return {
    dataText: dataText.slice(0, 12000),
    listingName,
    city,
    description,
    coverImageUrl,
    latitude,
    longitude,
    amenities: [...new Set(amenities)].slice(0, 15),
    sourceUrl,
    imported: Boolean(listingName || city || description || coverImageUrl),
  };
}

export async function importAirbnbListing(url: string, sourceOwnerConfirmed: boolean): Promise<AirbnbImportResult> {
  if (!sourceOwnerConfirmed) {
    throw new Error("You must confirm that you own, manage, or are authorized to use this listing information.");
  }

  try {
    const html = await fetchAirbnbHtml(url);
    return extractAirbnbMetadata(html, url);
  } catch (error: any) {
    return {
      dataText: "",
      sourceUrl: url,
      imported: false,
      warning: error?.message || "Airbnb import was unavailable. Continue with city/manual details.",
    };
  }
}

export { isAllowedAirbnbUrl };
