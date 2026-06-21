import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShoppingBag } from "lucide-react";
import { DynamicCatalog } from "@/components/DynamicCatalog";
import { MotionReveal } from "@/components/MotionReveal";
import { RequestForm } from "@/components/RequestForm";
import { SectionIntro } from "@/components/SectionIntro";
import { Testimonials } from "@/components/Testimonials";
import { FindUs } from "@/components/FindUs";
import { services, trustPoints } from "@/lib/static-data";
import { HeroAnimation } from "@/components/HeroAnimation";


export default function Home() {
  return (
    <main>
      <section className="relative min-h-screen overflow-hidden bg-espresso text-crema">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        {/* Bottom-left black gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/35 to-transparent pointer-events-none" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl content-end px-4 pt-28 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <HeroAnimation>
            <div className="max-w-4xl">
              <p className="hero-text-zoom text-xs sm:text-sm font-bold uppercase tracking-[0.4em] text-brass">Kigali · Rwanda Arabica</p>
              <h1 className="hero-text-zoom mt-6 sm:mt-8 font-serif text-3xl leading-[1.1] sm:text-6xl lg:text-7xl tracking-tight">Mugamba Coffee Factory</h1>
              <p className="hero-text-zoom mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-crema/85 border-l-4 border-brass pl-6">
                Premium Arabica coffee, professional roasting, and coffee machine solutions for homes, cafés, offices, and events.
              </p>
              <div className="hero-text-zoom mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
                <Link href="/products" className="inline-flex items-center gap-2 bg-brass px-5 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-widest text-espresso transition-all duration-300 hover:bg-crema shadow-[4px_4px_0px_0px_#24130f] hover:scale-105 hover:shadow-[5px_5px_0px_0px_#c99a4a]">
                  <ShoppingBag size={16} /> Buy Coffee
                </Link>
                <Link href="/rentals" className="inline-flex items-center gap-2 border-2 border-crema/40 bg-transparent px-5 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-widest text-crema transition-all duration-300 hover:border-brass hover:text-brass shadow-[4px_4px_0px_0px_rgba(247,239,225,0.25)] hover:scale-105 hover:shadow-[5px_5px_0px_0px_#c99a4a]">
                  Rentals
                </Link>
                <a href="#contact" className="inline-flex items-center gap-2 border-2 border-crema/40 bg-transparent px-5 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-widest text-crema transition-all duration-300 hover:border-brass hover:text-brass shadow-[4px_4px_0px_0px_rgba(247,239,225,0.25)] hover:scale-105 hover:shadow-[5px_5px_0px_0px_#c99a4a]">
                  <MessageCircle size={16} /> Contact
                </a>
              </div>
            </div>
          </HeroAnimation>
        </div>
      </section>

      <section className="bg-crema py-16 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="self-center">
              <SectionIntro eyebrowSize="text-[10px] sm:text-xs" titleSize="text-2xl sm:text-5xl" eyebrow="Featured services" title="A complete premium platform" body="Mugamba combines coffee craft, equipment access, and fast WhatsApp communication so buyers can move from interest to conversation quickly." />
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <MotionReveal key={service.title} delay={index * 0.06}>
                    <Link href={service.href} className="block h-full border border-espresso/15 bg-white p-6 sm:p-8 transition-all duration-300 shadow-[4px_4px_0px_0px_#24130f] hover:scale-[1.03] hover:shadow-[6px_6px_0px_0px_#c99a4a] hover:border-brass/40">
                      <Icon className="text-roast" size={32} />
                      <h3 className="mt-6 sm:mt-8 font-serif text-xl sm:text-2xl text-espresso tracking-tight">{service.title}</h3>
                      <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-espresso/70">{service.description}</p>
                    </Link>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 sm:gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative min-h-[300px] sm:min-h-[500px] bg-espresso/5 border border-espresso/10 shadow-[8px_8px_0px_0px_#24130f]">
            <Image 
              src="/media/factory.jpg" 
              alt="Mugamba Coffee Factory coffee bar and machines" 
              fill 
              priority 
              sizes="(min-width: 1024px) 50vw, 100vw" 
              className="object-cover"
            />
          </div>
          <div className="self-center">
            <SectionIntro eyebrow="About Mugamba" title="Roasted with care" body="The brand experience is built around quality Arabica coffee, precise roasting, reliable coffee machines, and a clear request process for every buyer." />
          </div>
        </div>
      </section>

      <section className="bg-crema py-16 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 sm:gap-8">
            <SectionIntro eyebrow="Featured products" title="Coffee and machines" body="Products uploaded in the admin dashboard appear here automatically, with request buttons that save the customer lead." />
            <Link href="/products" className="inline-flex items-center gap-2 border-2 border-espresso/15 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-widest text-espresso hover:border-roast hover:text-roast transition">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mt-12 sm:mt-16">
            <DynamicCatalog featuredOnly limit={6} />
          </div>
        </div>
      </section>

      <section className="noise bg-espresso py-16 sm:py-32 text-crema">
        <div className="mx-auto grid max-w-7xl gap-12 sm:gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="self-center">
            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.4em] text-brass">Coffee experience</p>
            <h2 className="mt-4 sm:mt-6 font-serif text-3xl sm:text-6xl tracking-tight">International polish, Rwandan character.</h2>
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl leading-relaxed text-crema/70 border-l-4 border-brass pl-6">
              The site is designed for quick ordering, visible contact paths, and structured product management for Kigali's coffee scene.
            </p>
          </div>
          <div className="relative min-h-[300px] sm:min-h-[400px] border border-white/10">
            <Image src="/media/latte.jpg" alt="Premium Mugamba coffee cup" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro align="center" eyebrow="Testimonials" title="Built for trust" body="The admin can add real customer reviews as the business gathers more proof from buyers, offices, cafés, and event clients." />
          <Testimonials />
        </div>
      </section>

      <section id="contact" className="bg-crema py-16 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 sm:gap-16 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="space-y-8">
            <SectionIntro
              eyebrow="Get in touch"
              title="Visit Kigali factory"
              body="Reach out to us via phone or email, or visit our factory in Gikondo. We are ready to assist with all your coffee needs." 
            />
            <FindUs />
          </div>

          <RequestForm requestType="contact" />
        </div>
      </section>

    </main>
  );
}
