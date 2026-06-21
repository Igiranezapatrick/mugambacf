import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-espresso text-crema">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <Image src="/media/logo.jpg" alt="Mugamba Coffee Factory logo" width={64} height={64} className="rounded-full border border-white/10 object-cover" />
          </Link>
          <h2 className="font-serif text-3xl tracking-tight">Mugamba Coffee Factory</h2>
          <p className="max-w-md text-base leading-relaxed text-crema/60">
            Premium Rwandan Arabica coffee, professional machine sales, rentals, and roasting services. Committed to excellence in every bean and partnership.
          </p>
        </div>
        
        <div>
          <h3 className="text-base font-bold uppercase tracking-[0.25em] text-brass">Explore</h3>
          <div className="mt-8 grid gap-4 text-base text-crema/80">
            <Link href="/coffee" className="hover:text-brass transition underline-offset-4 hover:underline">Coffee Products</Link>
            <Link href="/machines" className="hover:text-brass transition underline-offset-4 hover:underline">Coffee Machines</Link>
            <Link href="/rentals" className="hover:text-brass transition underline-offset-4 hover:underline">Machine Rentals</Link>
            <Link href="/roasting" className="hover:text-brass transition underline-offset-4 hover:underline">Roasting Services</Link>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold uppercase tracking-[0.25em] text-brass">Contact Us</h3>
          <div className="mt-8 grid gap-5 text-base text-crema/80">
            <span className="flex items-start gap-4">
              <MapPin size={22} className="shrink-0 text-brass" /> 
              <span>Kigali, Rwanda<br /><span className="text-sm opacity-60">KK 123 Street, Gikondo</span></span>
            </span>
            <a href="tel:+250787793722" className="flex items-center gap-4 hover:text-brass transition">
              <Phone size={22} className="shrink-0 text-brass" /> 
              <span>+250 787 793 722</span>
            </a>
            <a href="mailto:mugambaco@gmail.com" className="flex items-center gap-4 hover:text-brass transition">
              <Mail size={22} className="shrink-0 text-brass" /> 
              <span>mugambaco@gmail.com</span>
            </a>
            <a href="#contact" className="mt-2 inline-flex items-center justify-center gap-3 bg-brass px-6 py-3 font-bold uppercase tracking-widest text-espresso transition hover:bg-crema">
              <MessageCircle size={20} /> 
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm tracking-wide text-crema/40">
            © {new Date().getFullYear()} Mugamba Coffee Factory. All Rights Reserved.
          </p>
          
          <Link 
            href="/admin" 
            className="group flex items-center gap-2 text-crema/30 transition hover:text-brass"
            aria-label="Admin Login"
          >
            <Lock size={14} className="transition group-hover:scale-110" />
            <span className="text-xs font-bold uppercase tracking-widest">Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
