# Mugamba Coffee Factory Website

Premium coffee website and admin dashboard for Mugamba Coffee Factory, built with Next.js, React, Tailwind CSS, Framer Motion, and Supabase.

## Setup

1. Copy the environment example:

```bash
cp .env.local.example .env.local
```

2. In `.env.local`, add:

```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_BUSINESS_WHATSAPP=2507XXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

3. Open Supabase SQL Editor for `https://uviybtmckwpllzcgdgbo.supabase.co` and run:

```bash
supabase/schema.sql
```

4. Create the admin user in Supabase Authentication, then sign in at `/admin`.

5. Run the app:

```bash
npm install
npm run dev
```

## Features

- Luxury homepage with Mugamba media assets.
- Coffee product listings with roast, origin, package size, and WhatsApp ordering.
- Coffee machine sales and rental listings managed by admin.
- Roasting service inquiry flow.
- Supabase request storage with admin status tracking.
- Product CRUD, image uploads through Supabase Storage, testimonials, and content blocks.
- SEO metadata, sitemap, robots file, responsive design, and local Rwanda/Kigali keyword coverage.

## Supabase Notes

The schema creates:

- `products`
- `requests`
- `testimonials`
- `content_blocks`
- public `product-images` storage bucket

Anonymous visitors can read active products/testimonials/content and create requests. Authenticated admin users can manage everything.
