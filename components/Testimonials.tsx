"use client";

import { useEffect, useState } from "react";
import { fetchTestimonials } from "@/lib/catalog";
import { fallbackTestimonials } from "@/lib/static-data";
import type { Testimonial } from "@/lib/types";

export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    let active = true;
    fetchTestimonials().then((testimonials) => {
      if (active) setItems(testimonials);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {items.map((item) => (
        <blockquote key={item.id} className="border-l-4 border-brass bg-espresso text-crema p-8 shadow-md">
          <p className="text-lg italic leading-relaxed text-crema/80">"{item.quote}"</p>
          <footer className="mt-8">
            <div className="text-base font-bold uppercase tracking-widest text-brass">{item.customer_name}</div>
            {item.role ? <div className="mt-1 text-sm uppercase tracking-wider text-crema/50">{item.role}</div> : null}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
