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


export default function Home() {
  return (
    <main>
      <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-espresso text-crema">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="/media/roastery.jpg">
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-mask absolute inset-0" />
        <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl content-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-base font-bold uppercase tracking-[0.4em] text-brass">Kigali · Rwanda Arabica · Coffee expertise</p>
            <h1 className="mt-8 font-serif text-5xl leading-[1.1] sm:text-7xl lg:text-9xl tracking-tight">Mugamba Coffee Factory</h1>
            <p className="mt-10 max-w-2xl text-xl leading-relaxed text-crema/85 border-l-4 border-brass pl-6">
              Premium Arabica coffee, professional roasting, and coffee machine solutions for homes, cafés, offices, and events.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/products" className="inline-flex items-center gap-4 bg-brass px-10 py-5 text-lg font-bold uppercase tracking-widest text-espresso transition hover:bg-crema">
                <ShoppingBag size={22} /> Buy Coffee
              </Link>
              <Link href="/rentals" className="inline-flex items-center gap-4 border-2 border-crema/40 bg-transparent px-10 py-5 text-lg font-bold uppercase tracking-widest text-crema transition hover:border-brass hover:text-brass">
                Rentals
              </Link>
              <a href="#contact" className="inline-flex items-center gap-4 border-2 border-crema/40 bg-transparent px-10 py-5 text-lg font-bold uppercase tracking-widest text-crema transition hover:border-brass hover:text-brass">
                <MessageCircle size={22} /> Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-crema py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Featured services" title="A complete premium coffee platform" body="Mugamba combines coffee craft, equipment access, and fast WhatsApp communication so buyers can move from interest to conversation quickly." />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <MotionReveal key={service.title} delay={index * 0.06}>
                  <Link href={service.href} className="block h-full border border-espresso/15 bg-white p-8 transition hover:border-brass/40 hover:shadow-lg">
                    <Icon className="text-roast" size={36} />
                    <h3 className="mt-8 font-serif text-2xl text-espresso tracking-tight">{service.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-espresso/70">{service.description}</p>
                  </Link>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative min-h-[500px] bg-espresso/5">
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
            <SectionIntro eyebrow="About Mugamba coffee" title="Roasted with care, served with discipline" body="The brand experience is built around quality Arabica coffee, precise roasting, reliable coffee machines, and a clear request process for every buyer." />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="border border-espresso/10 bg-crema/20 p-6">
                    <Icon className="text-sage" size={28} />
                    <h3 className="mt-6 font-bold uppercase tracking-wider text-espresso">{point.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-espresso/65">{point.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-crema py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionIntro eyebrow="Featured products" title="Coffee and machines" body="Products uploaded in the admin dashboard appear here automatically, with request buttons that save the customer lead and open WhatsApp." />
            <Link href="/products" className="inline-flex items-center gap-3 border-2 border-espresso/15 px-8 py-4 text-base font-bold uppercase tracking-widest text-espresso hover:border-roast hover:text-roast transition">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="mt-16">
            <DynamicCatalog featuredOnly limit={6} />
          </div>
        </div>
      </section>

      <section className="noise bg-espresso py-24 sm:py-32 text-crema">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="self-center">
            <p className="text-base font-bold uppercase tracking-[0.4em] text-brass">Coffee experience</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl tracking-tight">International polish, Rwandan character.</h2>
            <p className="mt-8 text-xl leading-relaxed text-crema/70 border-l-4 border-brass pl-6">
              The site is designed for quick ordering, visible contact paths, structured product management, and SEO around Kigali coffee, Rwanda Arabica, roasting, and machine rentals.
            </p>
          </div>
          <div className="relative min-h-[400px] border border-white/10">
            <Image src="/media/latte.jpg" alt="Premium Mugamba coffee cup" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro align="center" eyebrow="Testimonials" title="Built for trust" body="The admin can add real customer reviews as the business gathers more proof from buyers, offices, cafés, and event clients." />
          <Testimonials />
        </div>
      </section>

      <section id="contact" className="bg-crema py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="space-y-8">
            <SectionIntro
              eyebrow="Get in touch"
              title="Visit Mugamba in Kigali"
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
