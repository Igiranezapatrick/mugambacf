"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchProducts } from "@/lib/catalog";
import { fallbackProducts } from "@/lib/static-data";
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
    const source = products.length ? products : fallbackProducts.filter((product) => !productType || product.product_type === productType);
    return limit ? source.slice(0, limit) : source;
  }, [products, productType, limit]);

  if (loading) {
    return (
      <div className="grid place-items-center rounded-lg border border-espresso/10 bg-white py-16 text-espresso/60">
        <Loader2 className="animate-spin" />
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
