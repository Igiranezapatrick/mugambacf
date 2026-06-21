import { fallbackTestimonials } from "./static-data";
import { supabase } from "./supabase";
import type { Product, ProductType, Testimonial } from "./types";

export async function fetchProducts(productType?: ProductType, featuredOnly = false): Promise<Product[]> {
  if (!supabase) {
    console.warn("Supabase is not configured. Returning empty product list.");
    return [];
  }

  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (featuredOnly) query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching products from database:", error);
    return [];
  }

  const allProducts = (data || []) as Product[];

  if (!productType) {
    return allProducts;
  }

  return allProducts.filter((product) => {
    const categoryLower = (product.category || "").toLowerCase().trim();
    const isCoffee = categoryLower === "coffe" || categoryLower === "coffee";

    if (productType === "coffee") {
      return isCoffee;
    }
    if (productType === "rental" || productType === "machine") {
      return !isCoffee;
    }

    return true;
  });
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return fallbackTestimonials;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error || !data?.length) return fallbackTestimonials;
  return data as Testimonial[];
}
