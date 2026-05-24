import { Coffee, CupSoda, Factory, Handshake, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import type { Product, Testimonial } from "./types";

export const fallbackProducts: Product[] = [
  {
    id: "coffee-premium-arabica",
    name: "Mugamba Premium Arabica",
    slug: "mugamba-premium-arabica",
    product_type: "coffee",
    category: "Roasted Arabica coffee",
    description: "A clean, aromatic Arabica roast prepared for homes, offices, and hospitality buyers.",
    origin: "Rwanda highlands",
    roast_level: "Medium roast",
    package_size: "250g, 500g, 1kg",
    price: "Request price",
    rental_duration: null,
    specs: null,
    image_url: "/media/brand-card.jpg",
    is_featured: true,
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "coffee-ground-arabica",
    name: "Ground Arabica Coffee",
    slug: "ground-arabica-coffee",
    product_type: "coffee",
    category: "Ground coffee",
    description: "Freshly roasted and ground for filter, espresso, and everyday café preparation.",
    origin: "Rwanda",
    roast_level: "Medium-dark roast",
    package_size: "250g, 500g",
    price: "Request price",
    rental_duration: null,
    specs: null,
    image_url: "/media/latte.jpg",
    is_featured: true,
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "machine-commercial-espresso",
    name: "Commercial Espresso Machine",
    slug: "commercial-espresso-machine",
    product_type: "machine",
    category: "Coffee machine sales",
    description: "Professional espresso machines for cafés, restaurants, offices, and hospitality teams.",
    origin: null,
    roast_level: null,
    package_size: null,
    price: "Admin sets price",
    rental_duration: null,
    specs: { Groupheads: "Configurable", Use: "Commercial", Support: "Setup guidance available" },
    image_url: "/media/factory.jpg",
    is_featured: true,
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "rental-event-machine",
    name: "Event Coffee Machine Rental",
    slug: "event-coffee-machine-rental",
    product_type: "rental",
    category: "Machine rentals",
    description: "Reliable coffee machine rental packages for events, offices, and short-term service needs.",
    origin: null,
    roast_level: null,
    package_size: null,
    price: "Request quote",
    rental_duration: "Daily, weekly, monthly",
    specs: { Includes: "Machine setup", BestFor: "Events and offices", Support: "Operator guidance" },
    image_url: "/media/roastery.jpg",
    is_featured: true,
    is_active: true,
    sort_order: 4,
    created_at: new Date().toISOString()
  }
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "t1",
    customer_name: "Aline M.",
    role: "Kigali hospitality buyer",
    quote: "Mugamba helped us upgrade the coffee experience for guests with reliable machines and a rich Arabica profile.",
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "t2",
    customer_name: "Patrick N.",
    role: "Office client",
    quote: "The team responds quickly on WhatsApp and the roast quality is consistent from order to order.",
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "t3",
    customer_name: "Claudine U.",
    role: "Coffee service partner",
    quote: "Their roasting service gives us a premium finish while keeping the character of Rwandan Arabica.",
    is_active: true,
    created_at: new Date().toISOString()
  }
];

export const services = [
  {
    title: "Coffee Roasting",
    href: "/roasting",
    description: "Commercial roasting for Arabica profiles with careful batch control and a clean finish.",
    icon: Factory
  },
  {
    title: "Machine Sales",
    href: "/machines",
    description: "Espresso and coffee equipment uploaded and priced by the Mugamba admin team.",
    icon: Coffee
  },
  {
    title: "Machine Rentals",
    href: "/rentals",
    description: "Short-term and recurring rental options for events, offices, and hospitality setups.",
    icon: Handshake
  },
  {
    title: "Arabica Coffee",
    href: "/products",
    description: "Whole bean, ground, roasted Arabica, and premium blends for direct WhatsApp ordering.",
    icon: CupSoda
  }
];

export const trustPoints = [
  { title: "Rwanda Arabica Focus", body: "Coffee storytelling shaped around local origin, freshness, and premium preparation.", icon: PackageCheck },
  { title: "WhatsApp Sales Flow", body: "Every inquiry is saved in Supabase and opens a direct business conversation.", icon: Truck },
  { title: "Admin Control", body: "Products, prices, images, requests, and content can be managed from the dashboard.", icon: ShieldCheck },
  { title: "Luxury but Practical", body: "A refined interface that stays clean, fast, mobile-friendly, and easy to use.", icon: Sparkles }
];
