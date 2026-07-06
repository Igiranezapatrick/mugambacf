import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="noise bg-espresso text-crema relative overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brass/35 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.85fr_0.85fr] border-b border-white/5 pb-10">
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <Image 
                src="/media/logo.jpg" 
                alt="Mugamba Coffee Factory logo" 
                width={48} 
                height={48} 
                className="rounded-full border border-brass/20 object-cover transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-105" 
              />
            </Link>
            <h2 className="font-serif text-xl sm:text-2xl tracking-tight text-white">Mugamba Coffee Factory</h2>
            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-crema/60">
              Premium Rwandan Arabica coffee, professional machine sales, rentals, and commercial roasting services. Committed to excellence, batch consistency, and direct Kigali partnerships.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-brass">Explore</h3>
            <div className="mt-5 flex flex-col gap-3 text-xs sm:text-sm text-crema/80">
              <Link href="/" className="group flex items-center gap-1 hover:text-brass transition-all duration-300 hover:translate-x-1">
                <span>Home</span>
              </Link>
              <Link href="/coffee" className="group flex items-center gap-1 hover:text-brass transition-all duration-300 hover:translate-x-1">
                <span>Coffee Products</span>
              </Link>
              <Link href="/machines" className="group flex items-center gap-1 hover:text-brass transition-all duration-300 hover:translate-x-1">
                <span>Coffee Machines</span>
              </Link>
              <Link href="/rentals" className="group flex items-center gap-1 hover:text-brass transition-all duration-300 hover:translate-x-1">
                <span>Machine Rentals</span>
              </Link>
              <Link href="/roasting" className="group flex items-center gap-1 hover:text-brass transition-all duration-300 hover:translate-x-1">
                <span>Roasting Services</span>
              </Link>
              <Link href="/products" className="group flex items-center gap-1 hover:text-brass transition-all duration-300 hover:translate-x-1">
                <span>Shop</span>
              </Link>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-brass">Contact Us</h3>
            <div className="mt-5 flex flex-col gap-4 text-xs sm:text-sm text-crema/80">
              <span className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-brass mt-0.5" /> 
                <span className="leading-relaxed">Kigali, Rwanda<br /><span className="text-xs opacity-50">KK 123 Street, Gikondo</span></span>
              </span>
              <a href="tel:+250787793722" className="flex items-center gap-3 hover:text-brass transition-colors duration-300">
                <Phone size={18} className="shrink-0 text-brass" /> 
                <span>+250 787 793 722</span>
              </a>
              <a href="mailto:mugambaco@gmail.com" className="flex items-center gap-3 hover:text-brass transition-colors duration-300">
                <Mail size={18} className="shrink-0 text-brass" /> 
                <span>mugambaco@gmail.com</span>
              </a>
              <div className="pt-1.5">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center gap-2 border border-brass text-brass px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(201,154,74,0.2)] hover:bg-brass hover:text-espresso hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                >
                  <MessageCircle size={14} className="shrink-0" /> 
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer credit bar */}
        <div className="pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs">
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
            <p className="tracking-wide text-crema/40">
              © {new Date().getFullYear()} Mugamba Coffee Factory. All Rights Reserved.
            </p>
            <p className="text-[11px] text-crema/50">
              Made by <a href="https://micorp" target="_blank" rel="noopener noreferrer" className="text-brass hover:text-white underline decoration-brass/30 hover:decoration-white underline-offset-4 transition duration-300 font-bold">Mirror Corporation</a>. Contact for our services.
            </p>
          </div>
          
          <Link 
            href="/admin" 
            className="group flex items-center gap-1.5 text-crema/30 transition hover:text-brass"
            aria-label="Admin Portal"
          >
            <Lock size={12} className="transition group-hover:scale-110" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
