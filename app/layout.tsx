import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mugamba.rw/";
const siteName = "Mugamba Coffee Factory";
const siteNavigation = [
  { name: "Home", url: `${siteUrl}` },
  { name: "Coffee Products", url: `${siteUrl}coffee/` },
  { name: "Coffee Machines", url: `${siteUrl}machines/` },
  { name: "Machine Rentals", url: `${siteUrl}rentals/` },
  { name: "Roasting Services", url: `${siteUrl}roasting/` },
  { name: "Shop", url: `${siteUrl}products/` }
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}logo/logo.png`
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}products/`,
        "query-input": "required name=search_term_string"
      }
    },
    ...siteNavigation.map((item) => ({
      "@type": "SiteNavigationElement",
      name: item.name,
      url: item.url
    }))
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Premium Arabica Coffee in Kigali, Rwanda`,
    template: `%s | ${siteName}`
  },
  description:
    "Mugamba Coffee Factory sells premium Rwandan Arabica coffee, coffee machines, machine rentals, and professional roasting services in Kigali, Rwanda.",
  keywords: [
    "Mugamba Coffee Factory",
    "Rwanda Arabica coffee",
    "Kigali coffee",
    "coffee machine rental Rwanda",
    "coffee roasting Kigali",
    "coffee machine sales Rwanda"
  ],
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" }
    ],
    apple: [
      { url: "/icon.png", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Mugamba Coffee Factory",
    description: "Premium Arabica coffee, machine sales, rentals, and roasting services in Kigali, Rwanda.",
    url: siteUrl,
    siteName: "Mugamba Coffee Factory",
    images: [{ url: "/media/roastery.jpg", width: 1188, height: 1185 }],
    locale: "en_RW",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        <SmoothScroll>
          <SiteHeader />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
