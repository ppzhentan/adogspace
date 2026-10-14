"use client";

import { useEffect, useState } from "react";

const domains = [
  { name: "yangwandou.com", doodle: "pea" },
  { name: "1000000.money", doodle: "coin" },
  { name: "bujing.yun", doodle: "cloud" },
  { name: "goushi.yun", doodle: "cloud-face" },
  { name: "9du.beer", doodle: "beer" },
  { name: "bye.hair", doodle: "comb" },
];

type Expiration = { domain: string; expiresAt: string | null; source: string | null };

function DomainDoodle({ kind }: { kind: string }) {
  return (
    <svg className={`domain-doodle domain-doodle-${kind}`} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {kind === "pea" && <>
        <path d="M5 21c2-8 8-13 17-14 4 0 6 2 5 6-2 8-8 13-17 14-4 0-6-2-5-6Z" />
        <circle cx="12" cy="20" r="2.2" /><circle cx="18" cy="16" r="2.2" /><circle cx="23" cy="12" r="2" />
        <path d="M5 22 3 25m22-18 3-3" />
      </>}
      {kind === "coin" && <>
        <path d="M16 4c6.5 0 11 4.7 11 11.5S22 27 15.5 27 5 22.3 5 15.5 9.5 4 16 4Z" />
        <path d="M19.5 11c-.8-1-2-1.5-3.5-1.5-2 0-3.5 1-3.5 2.7 0 4 7 1.7 7 5.8 0 1.7-1.5 3-3.8 3-1.7 0-3.2-.6-4.2-1.8M16 7.5v17" />
        <path d="m5 7-2-2m24 21-2-2" />
      </>}
      {kind === "cloud" && <>
        <path d="M9 23h13a5 5 0 0 0 .3-10 7 7 0 0 0-13.5-1.5A5.8 5.8 0 0 0 9 23Z" />
        <path d="m12 27-1 2m8-2-1 2" />
      </>}
      {kind === "cloud-face" && <>
        <path d="M9 22h13a5 5 0 0 0 .3-10 7 7 0 0 0-13.5-1.5A5.8 5.8 0 0 0 9 22Z" />
        <path d="M13 17h.1m6-.2h.1m-5.2 2.8c1.1 1 2.8 1.1 4 .1" />
        <path d="m7 26-1 2m18-2 1 2" />
      </>}
      {kind === "beer" && <>
        <path d="M8 8h15l-1.5 18h-12L8 8Z" />
        <path d="M8 12H5v7h4m14-7h2c2 0 2 2 2 3.5S27 19 25 19h-3" />
        <path d="M9 8c-.7-2 1.5-3 2.5-1.2C12 3.5 16 4 16 7c1.4-2.6 5.3-1.5 5 1" />
        <path d="M11 15v6m5-6v6" />
      </>}
      {kind === "comb" && <>
        <path d="M7 12c4-5 13-6 18-2l-1 4c-4 3-12 3-17 1l-1-3Z" />
        <path d="m9 16 1 7m4-6 1 7m4-7 1 6m4-9 1 4" />
        <path d="M5 8c2-3 4-4 7-5m8 1 2 2" />
      </>}
    </svg>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function daysUntil(value: string) {
  const end = new Date(value);
  const now = new Date();
  const endDay = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
  const nowDay = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.ceil((endDay - nowDay) / (24 * 60 * 60 * 1000));
}

export function DomainStrip() {
  const [expirations, setExpirations] = useState<Record<string, { expiresAt: string | null; source: string | null }>>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/domain-expiry", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() as Promise<Expiration[]> : []))
      .then((items) => {
        setExpirations(Object.fromEntries(items.map(({ domain, expiresAt, source }) => [domain, { expiresAt, source }])));
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return (
    <nav className="domain-strip" aria-label="我的其他网站">
      {domains.map(({ name, doodle }) => {
        const result = expirations[name];
        const expiresAt = result?.expiresAt;
        const days = expiresAt ? daysUntil(expiresAt) : null;
        const isSoon = days !== null && days <= 30;
        const tooltip = expiresAt
          ? `域名到期时间：${formatDate(expiresAt)}${isSoon ? (days < 0 ? " · 已过期" : ` · ${days} 天内到期`) : ""}${result?.source ? ` · ${result.source}` : ""}`
          : "暂时无法查询到公开的域名到期时间";

        return (
          <a
            className="domain-strip-link"
            key={name}
            href={`https://${name}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name}，${tooltip}`}
          >
            <DomainDoodle kind={doodle} />
            <span className="domain-name">{name}</span>
            {isSoon && <span className="domain-warning">{days < 0 ? "已过期" : "30 天内到期"}</span>}
            <span className="domain-expiry-tooltip" role="tooltip">{tooltip}</span>
          </a>
        );
      })}
    </nav>
  );
}
