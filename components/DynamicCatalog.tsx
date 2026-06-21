"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchProducts } from "@/lib/catalog";
import type { Product, ProductType, RequestType } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { RequestModal } from "./RequestModal";

type DynamicCatalogProps = {
  productType?: ProductType;
  featuredOnly?: boolean;
  limit?: number;
};

export function DynamicCatalog({ productType, featuredOnly = false, limit }: DynamicCatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ product: Product; requestType: RequestType } | null>(null);

  useEffect(() => {
    let active = true;
    fetchProducts(productType, featuredOnly).then((items) => {
      if (active) {
        setProducts(items);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [productType, featuredOnly]);

  const visible = useMemo(() => {
    const source = products;
    return limit ? source.slice(0, limit) : source;
  }, [products, limit]);

  if (loading) {
    const skeletonCount = limit || 3;
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="animate-pulse border border-espresso/10 bg-white overflow-hidden flex flex-col h-full shadow-sm">
            <div className="relative aspect-[4/3] bg-espresso/5" />
            <div className="p-4 sm:p-6 flex flex-col flex-grow space-y-4">
              <div className="space-y-2 flex-grow">
                <div className="h-6 w-3/4 bg-espresso/10 rounded-sm" />
                <div className="h-4 w-full bg-espresso/5 rounded-sm mt-3" />
                <div className="h-4 w-5/6 bg-espresso/5 rounded-sm" />
              </div>
              <div className="space-y-2 pt-2 border-t border-espresso/5">
                <div className="h-4 w-1/2 bg-espresso/5 rounded-sm" />
                <div className="h-4 w-2/3 bg-espresso/5 rounded-sm" />
              </div>
              <div className="h-12 w-full bg-espresso/10 rounded-sm mt-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (visible.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-espresso/15 bg-white/40 backdrop-blur-md p-16 text-center shadow-inner">
        <p className="text-xl font-medium text-espresso/70">No products available at the moment.</p>
        <p className="mt-2 text-base text-espresso/50">Please check back later or contact us directly on WhatsApp!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} onRequest={(item, requestType) => setSelected({ product: item, requestType })} />
        ))}
      </div>
      {selected ? (
        <RequestModal product={selected.product} requestType={selected.requestType} onClose={() => setSelected(null)} />
      ) : null}
    </>
  );
}
