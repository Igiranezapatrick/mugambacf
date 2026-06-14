import type { Metadata } from "next";
import Image from "next/image";
import { DynamicCatalog } from "@/components/DynamicCatalog";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Premium Arabica Coffee Products",
  description: "Order whole bean, ground, roasted Arabica coffee, and premium Mugamba blends in Kigali, Rwanda through WhatsApp."
};

export default function ProductsPage() {
  return (
    <main className="bg-crema">
      <section className="bg-espresso py-20 text-crema">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="self-center">
            <p className="text-base font-bold uppercase tracking-[0.25em] text-brass">Coffee products</p>
            <h1 className="mt-3 font-serif text-5xl leading-tight sm:text-6xl">Premium Arabica for homes, offices, and cafés.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-crema/76">
              Whole bean coffee, ground coffee, roasted Arabica, and premium blends can be uploaded by admin and ordered directly through WhatsApp.
            </p>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-lg">
            <Image src="/media/brand-card.jpg" alt="Mugamba premium Arabica coffee brand" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" priority />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Order coffee" title="Fresh listings from the Mugamba admin" body="Each product includes roast details, origin, packaging size, pricing when available, and an order button connected to the request dashboard and WhatsApp." />
          <div className="mt-10">
            <DynamicCatalog productType="coffee" />
          </div>
        </div>
      </section>
    </main>
  );
}
