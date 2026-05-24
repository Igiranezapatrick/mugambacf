-- Mugamba Coffee Factory Supabase schema
-- Run this in the Supabase SQL editor for project uviybtmckwpllzcgdgbo.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.product_type as enum ('coffee', 'machine', 'rental');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.request_type as enum ('coffee_order', 'machine_purchase', 'machine_rental', 'roasting_service', 'contact');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.request_status as enum ('pending', 'contacted', 'completed', 'cancelled');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  product_type public.product_type not null,
  category text,
  description text not null,
  origin text,
  roast_level text,
  package_size text,
  price text,
  rental_duration text,
  specs jsonb,
  image_url text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 10,
  created_at timestamptz not null default now()
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  request_type public.request_type not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text,
  message text,
  rental_duration text,
  status public.request_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  role text,
  quote text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  block_key text not null unique,
  title text not null,
  body text not null,
  image_url text,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_blocks_updated_at on public.content_blocks;
create trigger content_blocks_updated_at
before update on public.content_blocks
for each row execute function public.touch_updated_at();

alter table public.products enable row level security;
alter table public.requests enable row level security;
alter table public.testimonials enable row level security;
alter table public.content_blocks enable row level security;

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
on public.products for select
using (is_active = true);

drop policy if exists "Authenticated admins manage products" on public.products;
create policy "Authenticated admins manage products"
on public.products for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can create requests" on public.requests;
create policy "Public can create requests"
on public.requests for insert
with check (true);

drop policy if exists "Authenticated admins manage requests" on public.requests;
create policy "Authenticated admins manage requests"
on public.requests for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read active testimonials" on public.testimonials;
create policy "Public can read active testimonials"
on public.testimonials for select
using (is_active = true);

drop policy if exists "Authenticated admins manage testimonials" on public.testimonials;
create policy "Authenticated admins manage testimonials"
on public.testimonials for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read content blocks" on public.content_blocks;
create policy "Public can read content blocks"
on public.content_blocks for select
using (true);

drop policy if exists "Authenticated admins manage content blocks" on public.content_blocks;
create policy "Authenticated admins manage content blocks"
on public.content_blocks for all
to authenticated
using (true)
with check (true);

insert into public.products (name, slug, product_type, category, description, origin, roast_level, package_size, price, rental_duration, specs, image_url, is_featured, is_active, sort_order)
values
  ('Mugamba Premium Arabica', 'mugamba-premium-arabica', 'coffee', 'Roasted Arabica coffee', 'A clean, aromatic Arabica roast prepared for homes, offices, and hospitality buyers.', 'Rwanda highlands', 'Medium roast', '250g, 500g, 1kg', 'Request price', null, null, '/media/brand-card.jpg', true, true, 1),
  ('Ground Arabica Coffee', 'ground-arabica-coffee', 'coffee', 'Ground coffee', 'Freshly roasted and ground for filter, espresso, and everyday cafe preparation.', 'Rwanda', 'Medium-dark roast', '250g, 500g', 'Request price', null, null, '/media/latte.jpg', true, true, 2),
  ('Commercial Espresso Machine', 'commercial-espresso-machine', 'machine', 'Coffee machine sales', 'Professional espresso machines for cafes, restaurants, offices, and hospitality teams.', null, null, null, 'Admin sets price', null, '{"Use":"Commercial","Support":"Setup guidance available"}', '/media/factory.jpg', true, true, 3),
  ('Event Coffee Machine Rental', 'event-coffee-machine-rental', 'rental', 'Machine rentals', 'Reliable coffee machine rental packages for events, offices, and short-term service needs.', null, null, null, 'Request quote', 'Daily, weekly, monthly', '{"Includes":"Machine setup","BestFor":"Events and offices"}', '/media/roastery.jpg', true, true, 4)
on conflict (slug) do nothing;

insert into public.testimonials (customer_name, role, quote, is_active)
values
  ('Aline M.', 'Kigali hospitality buyer', 'Mugamba helped us upgrade the coffee experience for guests with reliable machines and a rich Arabica profile.', true),
  ('Patrick N.', 'Office client', 'The team responds quickly on WhatsApp and the roast quality is consistent from order to order.', true),
  ('Claudine U.', 'Coffee service partner', 'Their roasting service gives us a premium finish while keeping the character of Rwandan Arabica.', true)
on conflict do nothing;

insert into public.content_blocks (block_key, title, body, image_url)
values
  ('home_about', 'Roasted with care, served with business discipline', 'Mugamba Coffee Factory focuses on quality Arabica coffee, precise roasting, reliable coffee machines, and fast WhatsApp conversations.', '/media/factory.jpg'),
  ('roasting_intro', 'Commercial roasting with a premium finish', 'Profile-focused roasting for Arabica lots, premium blends, and business buyers who need consistency.', '/media/roastery.jpg')
on conflict (block_key) do nothing;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read product images" on storage.objects;
create policy "Public can read product images"
on storage.objects for select
using (bucket_id = 'product-images');

drop policy if exists "Authenticated admins upload product images" on storage.objects;
create policy "Authenticated admins upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');

drop policy if exists "Authenticated admins update product images" on storage.objects;
create policy "Authenticated admins update product images"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images')
with check (bucket_id = 'product-images');

drop policy if exists "Authenticated admins delete product images" on storage.objects;
create policy "Authenticated admins delete product images"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images');
