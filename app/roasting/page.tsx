import type { Metadata } from "next";
import Image from "next/image";
import { RequestForm } from "@/components/RequestForm";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Coffee Roasting Services",
  description: "Professional Arabica coffee roasting services from Mugamba Coffee Factory in Kigali, Rwanda."
};

export default function RoastingPage() {
  return (
    <main className="bg-crema">
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="self-center">
            <SectionIntro eyebrow="Coffee roasting" title="Commercial roasting with a premium finish" body="Mugamba Coffee Factory presents roasting services with quality standards, aroma control, batch consistency, and a direct inquiry workflow." />
            <div className="mt-8 grid gap-4">
              {[
                "Profile-focused roasting for Arabica lots and premium blends.",
                "Service inquiries saved in the admin dashboard for follow-up.",
                "WhatsApp handoff for quick discussion about volume, timing, and requirements."
              ].map((item) => (
                <p key={item} className="rounded-lg border border-espresso/10 bg-crema/55 p-4 text-sm leading-6 text-espresso/70">{item}</p>
              ))}
            </div>
          </div>
          <div className="relative min-h-[460px] overflow-hidden rounded-lg">
            <Image src="/media/roastery.jpg" alt="Mugamba coffee roasting service area" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <SectionIntro eyebrow="Roasting inquiry" title="Tell Mugamba what you need roasted" body="The form captures the customer name, phone number, and service notes, then opens a WhatsApp message for direct communication." />
          <RequestForm requestType="roasting_service" />
        </div>
      </section>
    </main>
  );
}
