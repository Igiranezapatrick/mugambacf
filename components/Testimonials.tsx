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
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {items.map((item) => (
        <blockquote key={item.id} className="rounded-lg border border-espresso/10 bg-crema/50 p-6">
          <p className="leading-7 text-espresso/72">"{item.quote}"</p>
          <footer className="mt-5 text-sm font-semibold text-espresso">
            {item.customer_name}
            {item.role ? ` · ${item.role}` : ""}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
