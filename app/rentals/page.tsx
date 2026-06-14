import type { Metadata } from "next";
import Image from "next/image";
import { DynamicCatalog } from "@/components/DynamicCatalog";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Coffee Machine Rentals",
  description: "Rent coffee machines for events, offices, cafés, and short-term use from Mugamba Coffee Factory in Kigali, Rwanda."
};

export default function RentalsPage() {
  return (
    <main className="bg-crema">
      <section className="bg-espresso py-20 text-crema">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="self-center">
            <p className="text-base font-bold uppercase tracking-[0.25em] text-brass">Machine rentals</p>
            <h1 className="mt-3 font-serif text-5xl leading-tight sm:text-6xl">Coffee equipment for events and service periods.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-crema/76">
              Customers can choose a rental listing, add rental details and duration, save the request in Supabase, and continue on WhatsApp.
            </p>
          </div>
          <div className="relative min-h-[380px] overflow-hidden rounded-lg">
            <Image src="/media/roastery.jpg" alt="Mugamba Coffee Factory roasting and coffee machine area" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" priority />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Rental listings" title="Admin-managed rental machines" body="Rental durations, machine details, pricing notes, and setup information can be controlled from the dashboard." />
          <div className="mt-10">
            <DynamicCatalog productType="rental" />
          </div>
        </div>
      </section>
    </main>
  );
}
