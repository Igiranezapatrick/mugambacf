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
    <article className="group overflow-hidden rounded-lg border border-espresso/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-espresso/5">
        <Image src={image} alt={product.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        {product.category ? (
          <span className="absolute left-4 top-4 rounded-full bg-crema/95 px-3 py-1 text-xs font-semibold text-espresso">{product.category}</span>
        ) : null}
      </div>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="font-serif text-2xl text-espresso">{product.name}</h3>
          <p className="mt-2 text-sm leading-6 text-espresso/68">{product.description}</p>
        </div>
        <div className="grid gap-2 text-sm text-espresso/72">
          {product.origin ? <span>Origin: {product.origin}</span> : null}
          {product.roast_level ? <span>Roast: {product.roast_level}</span> : null}
          {product.package_size ? <span>Size: {product.package_size}</span> : null}
          {product.rental_duration ? <span>Duration: {product.rental_duration}</span> : null}
          {product.price ? <span className="font-semibold text-roast">{product.price}</span> : null}
        </div>
        {product.specs ? (
          <div className="grid gap-1 border-t border-espresso/10 pt-4 text-xs text-espresso/60">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <span key={key}>{key}: {value}</span>
            ))}
          </div>
        ) : null}
        <button
          onClick={() => onRequest(product, requestType)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-4 py-3 text-sm font-semibold text-crema transition hover:bg-roast"
        >
          <MessageCircle size={16} />
          {product.product_type === "machine" ? "Request Machine" : product.product_type === "rental" ? "Rent Machine" : "Order Now"}
        </button>
      </div>
    </article>
  );
}
