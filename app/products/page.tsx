import type { Metadata } from "next";
import Image from "next/image";
import { ShopCatalog } from "@/components/ShopCatalog";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Premium Arabica Coffee Products & Machinery",
  description: "Browse the Mugamba Coffee Factory shop catalog for premium Arabica coffee beans and professional espresso machinery.",
  alternates: {
    canonical: "/products"
  }
};

export default function ProductsPage() {
  return (
    <main className="bg-crema">
      <section className="bg-espresso py-24 sm:py-32 text-crema">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="self-center">
            <p className="text-base font-bold uppercase tracking-[0.4em] text-brass border-b-2 border-brass inline-block pb-1">Mugamba Shop</p>
            <h1 className="mt-8 font-serif text-5xl leading-tight sm:text-7xl tracking-tight">Premium coffee and professional machinery.</h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-crema/70 border-l-4 border-brass pl-6">
              Rwandan Arabica beans, commercial espresso machines, and event rentals. Select items and place direct orders via WhatsApp.
            </p>
          </div>
          <div className="relative min-h-[400px] border border-white/10 shadow-2xl">
            <Image src="/media/brand-card.jpg" alt="Mugamba premium Arabica coffee brand" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
          </div>
        </div>
      </section>
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Shop Catalog" title="Premium Coffee & Professional Equipment" body="Browse our complete selection of fresh Rwandan coffee beans and commercial machines for purchase or lease." />
          <div className="mt-16">
            <ShopCatalog />
          </div>
        </div>
      </section>
    </main>
  );
}
