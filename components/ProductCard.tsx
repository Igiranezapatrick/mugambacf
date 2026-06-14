"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { Product, RequestType } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  onRequest: (product: Product, requestType: RequestType) => void;
};

function requestTypeFor(product: Product): RequestType {
  if (product.product_type === "machine") return "machine_purchase";
  if (product.product_type === "rental") return "machine_rental";
  return "coffee_order";
}

export function ProductCard({ product, onRequest }: ProductCardProps) {
  const image = product.image_url || "/media/latte.jpg";
  const requestType = requestTypeFor(product);

  return (
    <article className="group overflow-hidden border border-espresso/15 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-espresso/5">
        <Image src={image} alt={product.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        {product.category ? (
          <span className="absolute left-0 top-4 bg-brass px-3 py-1 text-xs font-bold uppercase tracking-wider text-espresso">{product.category}</span>
        ) : null}
      </div>
      <div className="space-y-4 p-6">
        <div>
          <h3 className="font-serif text-2xl text-espresso tracking-tight">{product.name}</h3>
          <p className="mt-3 text-base leading-relaxed text-espresso/75">{product.description}</p>
        </div>
        <div className="grid gap-2 text-base text-espresso/80">
          {product.origin ? <span className="flex justify-between border-b border-espresso/5 pb-1"><span>Origin</span> <span className="font-bold">{product.origin}</span></span> : null}
          {product.roast_level ? <span className="flex justify-between border-b border-espresso/5 pb-1"><span>Roast</span> <span className="font-bold">{product.roast_level}</span></span> : null}
          {product.package_size ? <span className="flex justify-between border-b border-espresso/5 pb-1"><span>Size</span> <span className="font-bold">{product.package_size}</span></span> : null}
          {product.rental_duration ? <span className="flex justify-between border-b border-espresso/5 pb-1"><span>Duration</span> <span className="font-bold">{product.rental_duration}</span></span> : null}
          {product.price ? <span className="mt-2 text-xl font-bold text-roast">{product.price}</span> : null}
        </div>
        {product.specs ? (
          <div className="grid gap-2 border-t border-espresso/10 pt-4 text-sm text-espresso/65">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <span key={key} className="flex justify-between"><span>{key}</span> <span>{value}</span></span>
            ))}
          </div>
        ) : null}
        <button
          onClick={() => onRequest(product, requestType)}
          className="mt-2 inline-flex w-full items-center justify-center gap-3 bg-espresso px-6 py-4 text-base font-bold uppercase tracking-widest text-crema transition hover:bg-roast active:bg-espresso"
        >
          <MessageCircle size={20} />
          {product.product_type === "machine" ? "Request Purchase" : product.product_type === "rental" ? "Request Rental" : "Order Now"}
        </button>
      </div>
    </article>
  );
}
