import { fallbackProducts, fallbackTestimonials } from "./static-data";
import { supabase } from "./supabase";
import type { Product, ProductType, Testimonial } from "./types";

export async function fetchProducts(productType?: ProductType, featuredOnly = false): Promise<Product[]> {
  if (!supabase) {
    return fallbackProducts.filter((product) => {
      return (!productType || product.product_type === productType) && (!featuredOnly || product.is_featured);
    });
  }

  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (productType) query = query.eq("product_type", productType);
  if (featuredOnly) query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error || !data?.length) {
    return fallbackProducts.filter((product) => {
      return (!productType || product.product_type === productType) && (!featuredOnly || product.is_featured);
    });
  }

  return data as Product[];
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
