export type ProductType = "coffee" | "machine" | "rental";

export type RequestType = "coffee_order" | "machine_purchase" | "machine_rental" | "roasting_service" | "contact";

export type RequestStatus = "pending" | "contacted" | "completed" | "cancelled";

export type Product = {
  id: string;
  name: string;
  slug: string;
  product_type: ProductType;
  category: string | null;
  description: string;
  origin: string | null;
  roast_level: string | null;
  package_size: string | null;
  price: string | null;
  rental_duration: string | null;
  specs: Record<string, string> | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type CustomerRequest = {
  id: string;
  full_name: string;
  phone: string;
  request_type: RequestType;
  product_id: string | null;
  product_name: string | null;
  message: string | null;
  rental_duration: string | null;
  status: RequestStatus;
  created_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  role: string | null;
  quote: string;
  is_active: boolean;
  created_at: string;
};

export type ContentBlock = {
  id: string;
  block_key: string;
  title: string;
  body: string;
  image_url: string | null;
  updated_at: string;
};
