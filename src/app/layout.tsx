import type { Metadata } from "next";
import { site } from "@/data/site";
import "./globals.css";

const baseUrl = "https://adog.space";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: `${site.mark} | ${site.role}`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: baseUrl,
    title: `${site.mark} | ${site.role}`,
    description: site.description,
    siteName: site.mark,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: { card: "summary_large_image", title: `${site.mark} | ${site.role}`, description: site.description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: baseUrl,
    description: site.description,
  };

  return (
    <html lang="zh-CN">
      <body>
        <a className="skip-link" href="#main">跳到正文</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
