import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mugamba.rw/";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mugamba Coffee Factory | Premium Arabica Coffee in Kigali, Rwanda",
    template: "%s | Mugamba Coffee Factory"
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
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
