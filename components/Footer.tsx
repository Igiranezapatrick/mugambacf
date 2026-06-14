import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-espresso text-crema">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Image src="/media/logo.jpg" alt="Mugamba Coffee Factory logo" width={58} height={58} className="mb-5 rounded-full" />
          <h2 className="font-serif text-3xl">Mugamba Coffee Factory</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-crema/70">
            Premium Rwandan Arabica coffee, professional machine sales, rentals, and roasting services built around fast WhatsApp communication.
          </p>
        </div>
        <div>
          <h3 className="text-base font-bold uppercase tracking-[0.2em] text-brass">Explore</h3>
          <div className="mt-6 grid gap-4 text-base text-crema/85">
            <Link href="/products" className="hover:text-brass transition">Coffee Products</Link>
            <Link href="/machines" className="hover:text-brass transition">Coffee Machines</Link>
            <Link href="/rentals" className="hover:text-brass transition">Machine Rentals</Link>
            <Link href="/roasting" className="hover:text-brass transition">Roasting Services</Link>
          </div>
        </div>
        <div>
          <h3 className="text-base font-bold uppercase tracking-[0.2em] text-brass">Contact Us</h3>
          <div className="mt-6 grid gap-4 text-base text-crema/85">
            <span className="flex items-center gap-3"><MapPin size={20} className="text-brass" /> Kigali, Rwanda</span>
            <span className="flex items-center gap-3"><Phone size={20} className="text-brass" /> +250 788 123 456</span>
            <span className="flex items-center gap-3"><Mail size={20} className="text-brass" /> info@mugamba.rw</span>
            <a href="#contact" className="mt-2 flex items-center gap-3 font-bold text-brass hover:text-crema transition">
              <MessageCircle size={20} /> 
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-crema/50">
        © {new Date().getFullYear()} Mugamba Coffee Factory. Premium coffee experiences in Rwanda.
      </div>
    </footer>
  );
}
