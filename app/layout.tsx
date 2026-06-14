import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
  openGraph: {
    title: "Mugamba Coffee Factory",
    description: "Premium Arabica coffee, machine sales, rentals, and roasting services in Kigali, Rwanda.",
    url: siteUrl,
    siteName: "Mugamba Coffee Factory",
    images: [{ url: "/media/roastery.jpg", width: 1188, height: 1185 }],
    locale: "en_RW",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
