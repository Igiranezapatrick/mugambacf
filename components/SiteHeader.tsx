import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";

const nav = [
  { label: "Coffee", href: "/products" },
  { label: "Machines", href: "/machines" },
  { label: "Rentals", href: "/rentals" },
  { label: "Roasting", href: "/roasting" },
  { label: "Admin", href: "/admin" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-espresso/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Mugamba Coffee Factory home">
          <Image src="/media/logo.jpg" alt="Mugamba Coffee Factory logo" width={48} height={48} className="h-12 w-12 rounded-full object-cover" priority />
          <span className="leading-tight text-crema">
            <span className="block font-serif text-lg">Mugamba</span>
            <span className="block text-xs uppercase tracking-[0.24em] text-brass">Coffee Factory</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-crema/80 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brass">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/products" className="hidden items-center gap-2 rounded-full border border-crema/20 px-4 py-2 text-sm text-crema transition hover:border-brass hover:text-brass sm:flex">
            <ShoppingBag size={16} />
            Buy Coffee
          </Link>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-brass px-4 py-2 text-sm font-semibold text-espresso transition hover:bg-crema">
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
