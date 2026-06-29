import type { Metadata } from "next";
import Image from "next/image";
import { DynamicCatalog } from "@/components/DynamicCatalog";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Coffee Machine Rentals",
  description: "Rent coffee machines for events, offices, cafés, and short-term use from Mugamba Coffee Factory in Kigali, Rwanda.",
  alternates: {
    canonical: "/rentals/"
  }
};

export default function RentalsPage() {
  return (
    <main className="bg-crema">
      <section className="bg-espresso py-24 sm:py-32 text-crema">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="self-center">
            <p className="text-base font-bold uppercase tracking-[0.4em] text-brass border-b-2 border-brass inline-block pb-1">Machine Rentals</p>
            <h1 className="mt-8 font-serif text-5xl leading-tight sm:text-7xl tracking-tight">Coffee equipment for events and service periods.</h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-crema/70 border-l-4 border-brass pl-6">
              Customers can choose a rental listing, add rental details and duration, save the request in Supabase, and continue on WhatsApp.
            </p>
          </div>
          <div className="relative min-h-[400px] border border-white/10 shadow-2xl">
            <Image src="/media/roastery.jpg" alt="Mugamba Coffee Factory roasting and coffee machine area" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" priority />
          </div>
        </div>
      </section>
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Rental listings" title="Admin-managed rental machines" body="Rental durations, machine details, pricing notes, and setup information can be controlled from the dashboard." />
          <div className="mt-16">
            <DynamicCatalog productType="rental" />
          </div>
        </div>
      </section>
    </main>
  );
}
