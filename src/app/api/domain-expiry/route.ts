const domains = [
  { name: "yangwandou.com", rdapUrl: "https://rdap.verisign.com/com/v1/domain/yangwandou.com" },
  { name: "1000000.money", rdapUrl: "https://rdap.identitydigital.services/rdap/domain/1000000.money" },
  { name: "bujing.yun", rdapUrl: "https://rdap.teleinfo.cn/domain/bujing.yun" },
  { name: "goushi.yun", rdapUrl: "https://rdap.teleinfo.cn/domain/goushi.yun" },
  { name: "9du.beer", rdapUrl: "https://rdap.nic.beer/domain/9du.beer" },
  { name: "bye.hair", rdapUrl: "https://rdap.centralnic.com/hair/domain/bye.hair" },
];

export const dynamic = "force-dynamic";

type RdapResponse = {
  events?: Array<{ eventAction?: string; eventDate?: string }>;
};

type WhoisJsonResponse = {
  expires?: string;
  expiration?: { date?: string };
};

function validDate(value?: string) {
  return value && Number.isFinite(Date.parse(value)) ? value : null;
}

async function lookupWhoisJson(domain: string) {
  const apiKey = process.env.WHOISJSON_API_KEY;
  if (!apiKey) return null;

  try {
    const url = new URL("https://whoisjson.com/api/v1/whois");
    url.searchParams.set("domain", domain);
    const response = await fetch(url, {
      headers: { Authorization: `TOKEN=${apiKey}` },
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as WhoisJsonResponse;
    const expiresAt = validDate(data.expires ?? data.expiration?.date);
    return expiresAt ? { expiresAt, source: "WHOIS fallback" } : null;
  } catch {
    return null;
  }
}

async function lookupExpiration({ name: domain, rdapUrl }: (typeof domains)[number]) {
  try {
    const response = await fetch(rdapUrl, {
      headers: { Accept: "application/rdap+json, application/json" },
      next: { revalidate: 60 * 60 * 24 * 7 },
    });

    if (response.ok) {
      const data = (await response.json()) as RdapResponse;
      const events = data.events ?? [];
      const expiration = events.find((event) => event.eventAction?.trim().toLowerCase() === "expiration")
        ?? events.find((event) => event.eventAction?.trim().toLowerCase() === "registrar expiration")
        ?? events.find((event) => event.eventAction?.trim().toLowerCase() === "registration expiration");
      const expiresAt = validDate(expiration?.eventDate);
      if (expiresAt) return { domain, expiresAt, source: "registry RDAP" };
    }
  } catch {
    // Continue to the WHOIS-backed provider if the registry RDAP is unavailable.
  }

  const fallback = await lookupWhoisJson(domain);
  return fallback
    ? { domain, ...fallback }
    : { domain, expiresAt: null, source: null };
}

export async function GET() {
  const results = await Promise.all(domains.map(lookupExpiration));
  const allResolved = results.every((result) => result.expiresAt !== null);
  return Response.json(results, {
    headers: {
      "Cache-Control": allResolved
        ? "public, s-maxage=604800, stale-while-revalidate=86400"
        : "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
