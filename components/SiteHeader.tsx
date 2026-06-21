"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MessageCircle, ShoppingBag, Menu, X } from "lucide-react";

const nav = [
  { label: "Coffee", href: "/coffee" },
  { label: "Machines", href: "/machines" },
  { label: "Rentals", href: "/rentals" },
  { label: "Roasting", href: "/roasting" }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl rounded-full border border-espresso/10 bg-white/90 text-espresso shadow-soft backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center justify-between px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Mugamba Coffee Factory home">
          <Image src="/media/logo.jpg" alt="Mugamba Coffee Factory logo" width={48} height={48} className="h-12 w-12 rounded-full object-cover" priority />
          <span className="leading-tight text-espresso">
            <span className="block font-serif text-base tracking-tight">Mugamba</span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-brass">Coffee Factory</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-bold uppercase tracking-widest text-espresso/90 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brass">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/products" className="hidden items-center gap-2 border border-espresso/30 bg-transparent px-4 py-2 text-sm font-bold uppercase tracking-widest text-espresso transition hover:border-brass hover:text-brass lg:flex">
            <ShoppingBag size={16} />
            Shop
          </Link>
          <a href="#contact" className="hidden items-center gap-2 bg-brass px-4 py-2 text-sm font-bold uppercase tracking-widest text-espresso transition hover:bg-espresso hover:text-crema sm:flex">
            <MessageCircle size={16} />
            Contact
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="flex p-2 text-espresso md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-[72px] w-full rounded-2xl border border-espresso/10 bg-white/95 py-6 shadow-2xl backdrop-blur-md md:hidden">
          <nav className="flex flex-col items-center gap-5 px-4">
            {nav.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-base font-bold uppercase tracking-widest text-espresso hover:text-brass"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex w-full flex-col gap-3">
              <Link 
                href="/products" 
                className="flex items-center justify-center gap-2 border border-espresso/30 py-3 text-sm font-bold uppercase tracking-widest text-espresso"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag size={16} /> Shop
              </Link>
              <a 
                href="#contact" 
                className="flex items-center justify-center gap-2 bg-brass py-3 text-sm font-bold uppercase tracking-widest text-espresso"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={16} /> Contact
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
