import type { Metadata } from "next";
import Image from "next/image";
import { DynamicCatalog } from "@/components/DynamicCatalog";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Coffee Machine Sales",
  description: "Browse coffee machines for sale from Mugamba Coffee Factory in Kigali, Rwanda and request purchase details on WhatsApp."
};

export default function MachinesPage() {
  return (
    <main className="bg-crema">
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="relative min-h-[400px] overflow-hidden rounded-lg">
            <Image src="/media/factory.jpg" alt="Coffee machine sales at Mugamba Coffee Factory" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
          </div>
          <div className="self-center">
            <SectionIntro eyebrow="Machine sales" title="Professional coffee machines, managed from admin" body="The admin can upload machine photos, specifications, descriptions, and prices. Customers submit their name and phone number, then continue the conversation on WhatsApp." />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Machine gallery" title="Available machines for purchase" body="Listings can include commercial specifications, price notes, setup support, and request buttons for direct sales handling." />
          <div className="mt-10">
            <DynamicCatalog productType="machine" />
          </div>
        </div>
      </section>
    </main>
  );
}
