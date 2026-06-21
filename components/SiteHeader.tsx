"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MessageCircle, ShoppingBag, Menu, X } from "lucide-react";

const nav = [
  { label: "Coffee", href: "/coffee" },
  { label: "Machines", href: "/machines" },
  { label: "Rentals", href: "/rentals" },
  { label: "Roasting", href: "/roasting" }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = isScrolled || isOpen;

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl border transition-all duration-300 ${
      isSolid 
        ? "border-espresso/10 bg-white/90 text-espresso shadow-soft" 
        : "border-transparent bg-transparent text-crema"
    }`}>
      <div className={`mx-auto flex items-center justify-between px-6 sm:px-8 transition-all duration-300 ${
        isSolid ? "h-14" : "h-20"
      }`}>
        <Link href="/" className="flex items-center gap-3" aria-label="Mugamba Coffee Factory home">
          <Image 
            src="/logo/logo.png" 
            alt="Mugamba Coffee Factory logo" 
            width={56} 
            height={56} 
            className={`rounded-full object-cover transition-all duration-300 ${
              isSolid ? "h-10 w-10" : "h-14 w-14"
            }`} 
            priority 
          />
          <span className={`leading-tight transition-colors duration-300 ${isSolid ? "text-espresso" : "text-crema"}`}>
            <span className={`block font-serif tracking-tight transition-all duration-300 ${isSolid ? "text-base" : "text-lg"}`}>Mugamba</span>
            <span className={`block font-bold uppercase tracking-[0.3em] text-brass transition-all duration-300 ${isSolid ? "text-[8px]" : "text-[9px]"}`}>Coffee Factory</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className={`hidden items-center gap-6 font-semibold uppercase tracking-[0.2em] transition-all duration-300 md:flex ${
            isSolid ? "text-[11px] text-espresso/90" : "text-xs text-crema/90"
          }`}>
            {nav.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="relative py-1 transition-colors duration-200 hover:text-brass group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brass transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/products" className={`hidden items-center gap-2 border bg-transparent font-semibold uppercase tracking-widest transition-all duration-300 rounded-md lg:flex ${
              isSolid 
                ? "border-espresso/20 text-espresso px-3.5 py-1.5 text-[11px] hover:bg-espresso hover:text-white" 
                : "border-crema/25 text-crema px-4 py-2 text-xs hover:bg-crema hover:text-espresso"
            }`}>
              <ShoppingBag size={isSolid ? 14 : 16} />
              Shop
            </Link>
            <a href="#contact" className={`hidden items-center gap-2 bg-brass font-semibold uppercase tracking-widest transition-all duration-300 rounded-md sm:flex ${
              isSolid 
                ? "text-espresso hover:bg-espresso hover:text-crema px-3.5 py-1.5 text-[11px]" 
                : "text-espresso hover:bg-crema hover:text-espresso px-4 py-2 text-xs"
            }`}>
              <MessageCircle size={isSolid ? 14 : 16} />
              Contact
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              className={`flex p-2 md:hidden transition-colors duration-300 ${isSolid ? "text-espresso" : "text-crema"}`} 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-[72px] w-full border border-espresso/10 bg-white/95 py-6 shadow-2xl md:hidden">
          <nav className="flex flex-col items-center gap-5 px-4">
            {nav.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-sm font-semibold uppercase tracking-[0.2em] text-espresso hover:text-brass transition"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex w-full flex-col gap-3">
              <Link 
                href="/products" 
                className="flex items-center justify-center gap-2 border border-espresso/20 py-2.5 text-xs font-semibold uppercase tracking-widest text-espresso rounded-md hover:bg-espresso hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag size={14} /> Shop
              </Link>
              <a 
                href="#contact" 
                className="flex items-center justify-center gap-2 bg-brass py-2.5 text-xs font-semibold uppercase tracking-widest text-espresso rounded-md hover:bg-espresso hover:text-crema transition"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={14} /> Contact
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
