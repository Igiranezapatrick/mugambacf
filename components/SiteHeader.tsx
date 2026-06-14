"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MessageCircle, ShoppingBag, Menu, X } from "lucide-react";

const nav = [
  { label: "Coffee", href: "/products" },
  { label: "Machines", href: "/machines" },
  { label: "Rentals", href: "/rentals" },
  { label: "Roasting", href: "/roasting" },
  { label: "Admin", href: "/admin" }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-espresso text-crema backdrop-blur-xl">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-4" aria-label="Mugamba Coffee Factory home">
          <Image src="/media/logo.jpg" alt="Mugamba Coffee Factory logo" width={56} height={56} className="h-14 w-14 object-cover" priority />
          <span className="leading-tight text-crema">
            <span className="block font-serif text-xl tracking-tight">Mugamba</span>
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-brass">Coffee Factory</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 text-base font-bold uppercase tracking-widest text-crema/90 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brass">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/products" className="hidden items-center gap-3 border border-crema/30 bg-transparent px-6 py-3 text-base font-bold uppercase tracking-widest text-crema transition hover:border-brass hover:text-brass lg:flex">
            <ShoppingBag size={20} />
            Shop
          </Link>
          <a href="#contact" className="hidden items-center gap-3 bg-brass px-6 py-3 text-base font-bold uppercase tracking-widest text-espresso transition hover:bg-crema sm:flex">
            <MessageCircle size={20} />
            Contact
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="flex p-2 text-crema md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="absolute left-0 top-24 w-full border-b border-espresso/20 bg-espresso py-8 shadow-2xl md:hidden">
          <nav className="flex flex-col items-center gap-6 px-4">
            {nav.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-lg font-bold uppercase tracking-widest text-crema hover:text-brass"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex w-full flex-col gap-4">
              <Link 
                href="/products" 
                className="flex items-center justify-center gap-3 border border-crema/30 py-4 text-base font-bold uppercase tracking-widest text-crema"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag size={20} /> Shop
              </Link>
              <a 
                href="#contact" 
                className="flex items-center justify-center gap-3 bg-brass py-4 text-base font-bold uppercase tracking-widest text-espresso"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={20} /> Contact
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
