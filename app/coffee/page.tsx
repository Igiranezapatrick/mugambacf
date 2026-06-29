import type { Metadata } from "next";
import Image from "next/image";
import { DynamicCatalog } from "@/components/DynamicCatalog";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Premium Rwandan Arabica Coffee Beans",
  description: "Freshly roasted and ground Arabica coffee beans sourced from the highlands of Rwanda, available for order from Mugamba Coffee Factory.",
  alternates: {
    canonical: "/coffee/"
  }
};

export default function CoffeePage() {
  return (
    <main className="bg-crema">
      <section className="bg-espresso py-24 sm:py-32 text-crema">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="self-center">
            <p className="text-base font-bold uppercase tracking-[0.4em] text-brass border-b-2 border-brass inline-block pb-1">Our Coffee</p>
            <h1 className="mt-8 font-serif text-5xl leading-tight sm:text-7xl tracking-tight">Pure Rwandan Arabica. Hand-picked, roasted with care.</h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-crema/70 border-l-4 border-brass pl-6">
              Sourced from the premium coffee regions of Rwanda, prepared in small batches at our Gikondo factory to deliver a rich, clean taste.
            </p>
          </div>
          <div className="relative min-h-[400px] border border-white/10 shadow-2xl">
            <Image src="/media/brand-card.jpg" alt="Mugamba premium Arabica coffee beans" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
          </div>
        </div>
      </section>
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Coffee Selection" title="Fresh Roasts & Grained Coffee" body="Choose from whole bean or ground packages. Submit your details to finalize your request directly via WhatsApp." />
          <div className="mt-16">
            <DynamicCatalog productType="coffee" />
          </div>
        </div>
      </section>
    </main>
  );
}
