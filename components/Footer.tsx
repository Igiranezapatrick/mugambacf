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
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">Explore</h3>
          <div className="mt-5 grid gap-3 text-sm text-crema/75">
            <Link href="/products" className="hover:text-brass">Coffee products</Link>
            <Link href="/machines" className="hover:text-brass">Coffee machines</Link>
            <Link href="/rentals" className="hover:text-brass">Machine rentals</Link>
            <Link href="/roasting" className="hover:text-brass">Roasting services</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">Contact</h3>
          <div className="mt-5 grid gap-3 text-sm text-crema/75">
            <span className="flex items-center gap-2"><MapPin size={16} /> Kigali, Rwanda</span>
            <span className="flex items-center gap-2"><Phone size={16} /> WhatsApp enabled</span>
            <span className="flex items-center gap-2"><Mail size={16} /> Requests saved in dashboard</span>
            <a href="#contact" className="flex items-center gap-2 text-brass"><MessageCircle size={16} /> Contact on WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-crema/50">
        © {new Date().getFullYear()} Mugamba Coffee Factory. Premium coffee experiences in Rwanda.
      </div>
    </footer>
  );
}
