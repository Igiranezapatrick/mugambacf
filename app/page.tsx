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
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-espresso text-crema">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="/media/roastery.jpg">
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-mask absolute inset-0" />
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl content-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brass">Kigali · Rwanda Arabica · Coffee expertise</p>
            <h1 className="mt-6 font-serif text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">Mugamba Coffee Factory</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-crema/82">
              Premium Arabica coffee, professional roasting, and coffee machine solutions for homes, cafés, offices, and events.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-semibold text-espresso transition hover:bg-crema">
                <ShoppingBag size={17} /> Buy Coffee
              </Link>
              <Link href="/rentals" className="inline-flex items-center gap-2 rounded-full border border-crema/25 px-5 py-3 text-sm font-semibold text-crema transition hover:border-brass hover:text-brass">
                Rent Machine
              </Link>
              <Link href="/machines" className="inline-flex items-center gap-2 rounded-full border border-crema/25 px-5 py-3 text-sm font-semibold text-crema transition hover:border-brass hover:text-brass">
                Buy Coffee Machine
              </Link>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-crema/25 px-5 py-3 text-sm font-semibold text-crema transition hover:border-brass hover:text-brass">
                <MessageCircle size={17} /> Contact on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-crema py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Featured services" title="A complete premium coffee platform" body="Mugamba combines coffee craft, equipment access, and fast WhatsApp communication so buyers can move from interest to conversation quickly." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <MotionReveal key={service.title} delay={index * 0.06}>
                  <Link href={service.href} className="block h-full rounded-lg border border-espresso/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                    <Icon className="text-roast" size={28} />
                    <h3 className="mt-5 font-serif text-2xl text-espresso">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-espresso/65">{service.description}</p>
                  </Link>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-espresso/5">
  <Image 
    src="/media/factory.jpg" 
    alt="Mugamba Coffee Factory coffee bar and machines" 
    fill 
    priority // <-- Forces Next.js to preload this above-the-fold image
    sizes="(min-width: 1024px) 45vw, 100vw" 
    className="object-cover z-10" // <-- Ensures the image stacks correctly
  />
</div>
          <div className="self-center">
            <SectionIntro eyebrow="About Mugamba coffee" title="Roasted with care, served with business discipline" body="The brand experience is built around quality Arabica coffee, precise roasting, reliable coffee machines, and a clear request process for every buyer." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="rounded-lg border border-espresso/10 bg-crema/55 p-5">
                    <Icon className="text-sage" size={24} />
                    <h3 className="mt-4 font-semibold text-espresso">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-espresso/65">{point.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-crema py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionIntro eyebrow="Featured products" title="Coffee and machines managed by admin" body="Products uploaded in the admin dashboard appear here automatically, with request buttons that save the customer lead and open WhatsApp." />
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-espresso/15 px-5 py-3 text-sm font-semibold text-espresso hover:border-roast hover:text-roast">
              View coffee <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10">
            <DynamicCatalog featuredOnly limit={6} />
          </div>
        </div>
      </section>

      <section className="noise bg-espresso py-20 text-crema">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brass">Coffee experience</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">International polish, Rwandan coffee character.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-crema/72">
              The site is designed for quick ordering, visible contact paths, structured product management, and SEO around Kigali coffee, Rwanda Arabica, roasting, and machine rentals.
            </p>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-lg">
            <Image src="/media/latte.jpg" alt="Premium Mugamba coffee cup" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro align="center" eyebrow="Testimonials" title="Built for trust before the first message" body="The admin can add real customer reviews as the business gathers more proof from buyers, offices, cafés, and event clients." />
          <Testimonials />
        </div>
      </section>

      <section id="contact" className="bg-crema py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="space-y-8">
            <SectionIntro
              eyebrow="Find us"
              title="Visit Mugamba in Kigali"
              body="Use the map below to locate us, then send your request and continue on WhatsApp." 
            />
            <FindUs />
          </div>

          <RequestForm requestType="contact" />
        </div>
      </section>

    </main>
  );
}
