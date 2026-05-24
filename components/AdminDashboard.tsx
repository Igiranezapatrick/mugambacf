"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { BarChart3, CheckCircle2, ImagePlus, Loader2, LogOut, PackagePlus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { requestLabel } from "@/lib/whatsapp";
import type { ContentBlock, CustomerRequest, Product, ProductType, RequestStatus, Testimonial } from "@/lib/types";

type Tab = "requests" | "products" | "testimonials" | "content";

const emptyProduct = {
  name: "",
  slug: "",
  product_type: "coffee" as ProductType,
  category: "",
  description: "",
  origin: "",
  roast_level: "",
  package_size: "",
  price: "",
  rental_duration: "",
  specsText: "",
  image_url: "",
  is_featured: true,
  is_active: true,
  sort_order: 10
};

export function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<Tab>("requests");
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  const stats = useMemo(() => {
    const pending = requests.filter((request) => request.status === "pending").length;
    const rentals = requests.filter((request) => request.request_type === "machine_rental").length;
    const coffee = requests.filter((request) => request.request_type === "coffee_order").length;
    const top = Object.entries(
      requests.reduce<Record<string, number>>((acc, request) => {
        const key = request.product_name || requestLabel(request.request_type);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0];

    return { total: requests.length, pending, rentals, coffee, top: top?.[0] || "No requests yet" };
  }, [requests]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const hasSession = Boolean(data.session);
      setAuthed(hasSession);
      setLoading(false);
      if (hasSession) void loadDashboard();
    });
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setAuthed(true);
    await loadDashboard();
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setAuthed(false);
  }

  async function loadDashboard() {
    if (!supabase) return;
    const [requestResult, productResult, testimonialResult, contentResult] = await Promise.all([
      supabase.from("requests").select("*").order("created_at", { ascending: false }),
      supabase.from("products").select("*").order("sort_order", { ascending: true }),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      supabase.from("content_blocks").select("*").order("block_key", { ascending: true })
    ]);

    if (requestResult.data) setRequests(requestResult.data as CustomerRequest[]);
    if (productResult.data) setProducts(productResult.data as Product[]);
    if (testimonialResult.data) setTestimonials(testimonialResult.data as Testimonial[]);
    if (contentResult.data) setContentBlocks(contentResult.data as ContentBlock[]);
  }

  async function updateStatus(id: string, status: RequestStatus) {
    if (!supabase) return;
    await supabase.from("requests").update({ status }).eq("id", id);
    setRequests((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  function productInitialValues() {
    if (!editing) return emptyProduct;
    return {
      name: editing.name,
      slug: editing.slug,
      product_type: editing.product_type,
      category: editing.category || "",
      description: editing.description,
      origin: editing.origin || "",
      roast_level: editing.roast_level || "",
      package_size: editing.package_size || "",
      price: editing.price || "",
      rental_duration: editing.rental_duration || "",
      specsText: editing.specs ? Object.entries(editing.specs).map(([key, value]) => `${key}: ${value}`).join("\n") : "",
      image_url: editing.image_url || "",
      is_featured: editing.is_featured,
      is_active: editing.is_active,
      sort_order: editing.sort_order
    };
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const rawSlug = String(form.get("slug") || "").trim();
    const slug = rawSlug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const file = form.get("image") as File | null;
    let imageUrl = String(form.get("image_url") || "").trim();

    if (file && file.size > 0) {
      const extension = file.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${slug}.${extension}`;
      const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
      if (uploadError) {
        setBusy(false);
        setMessage(uploadError.message);
        return;
      }
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      imageUrl = data.publicUrl;
    }

    const specsText = String(form.get("specsText") || "");
    const specs = specsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .reduce<Record<string, string>>((acc, line) => {
        const [key, ...rest] = line.split(":");
        if (key && rest.length) acc[key.trim()] = rest.join(":").trim();
        return acc;
      }, {});

    const payload = {
      name,
      slug,
      product_type: String(form.get("product_type")) as ProductType,
      category: String(form.get("category") || "").trim() || null,
      description: String(form.get("description") || "").trim(),
      origin: String(form.get("origin") || "").trim() || null,
      roast_level: String(form.get("roast_level") || "").trim() || null,
      package_size: String(form.get("package_size") || "").trim() || null,
      price: String(form.get("price") || "").trim() || null,
      rental_duration: String(form.get("rental_duration") || "").trim() || null,
      specs: Object.keys(specs).length ? specs : null,
      image_url: imageUrl || null,
      is_featured: form.get("is_featured") === "on",
      is_active: form.get("is_active") === "on",
      sort_order: Number(form.get("sort_order") || 10)
    };

    const result = editing
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);

    setBusy(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    setEditing(null);
    (event.currentTarget as HTMLFormElement).reset();
    await loadDashboard();
    setMessage("Product saved.");
  }

  async function deleteProduct(id: string) {
    if (!supabase) return;
    await supabase.from("products").delete().eq("id", id);
    await loadDashboard();
  }

  async function saveTestimonial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.from("testimonials").insert({
      customer_name: String(form.get("customer_name") || "").trim(),
      role: String(form.get("role") || "").trim() || null,
      quote: String(form.get("quote") || "").trim(),
      is_active: true
    });
    if (error) setMessage(error.message);
    (event.currentTarget as HTMLFormElement).reset();
    await loadDashboard();
  }

  async function saveContent(event: FormEvent<HTMLFormElement>, block?: ContentBlock) {
    event.preventDefault();
    if (!supabase) return;
    const form = new FormData(event.currentTarget);
    const payload = {
      block_key: String(form.get("block_key") || block?.block_key || "").trim(),
      title: String(form.get("title") || "").trim(),
      body: String(form.get("body") || "").trim(),
      image_url: String(form.get("image_url") || "").trim() || null
    };
    if (block) {
      await supabase.from("content_blocks").update(payload).eq("id", block.id);
    } else {
      await supabase.from("content_blocks").insert(payload);
      (event.currentTarget as HTMLFormElement).reset();
    }
    await loadDashboard();
  }

  if (!supabase) {
    return (
      <div className="rounded-lg border border-brass/30 bg-brass/10 p-6 text-espresso">
        <h2 className="font-serif text-3xl">Supabase key required</h2>
        <p className="mt-3 leading-7">
          Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`, run the SQL in `supabase/schema.sql`, then restart the dev server.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="grid min-h-[40vh] place-items-center"><Loader2 className="animate-spin text-roast" /></div>;
  }

  if (!authed) {
    return (
      <form onSubmit={signIn} className="mx-auto grid max-w-md gap-4 rounded-lg border border-espresso/10 bg-white p-6 shadow-soft">
        <h1 className="font-serif text-3xl text-espresso">Admin login</h1>
        <input value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Email" type="email" />
        <input value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Password" type="password" />
        {message ? <p className="text-sm text-red-700">{message}</p> : null}
        <button disabled={busy} className="rounded-full bg-espresso px-5 py-3 font-semibold text-crema">{busy ? "Signing in..." : "Sign in"}</button>
      </form>
    );
  }

  const values = productInitialValues();

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-espresso">Admin dashboard</h1>
          <p className="mt-2 text-espresso/65">Manage requests, product listings, content, and customer trust signals.</p>
        </div>
        <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-espresso/15 px-4 py-2 text-sm text-espresso">
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Total requests", stats.total],
          ["Pending", stats.pending],
          ["Coffee orders", stats.coffee],
          ["Rentals", stats.rentals],
          ["Most requested", stats.top]
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-espresso/10 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-roast">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-espresso">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {(["requests", "products", "testimonials", "content"] as Tab[]).map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${tab === item ? "bg-espresso text-crema" : "border border-espresso/15 text-espresso"}`}>
            {item}
          </button>
        ))}
      </div>

      {message ? <p className="rounded-md bg-brass/10 px-4 py-3 text-sm text-espresso">{message}</p> : null}

      {tab === "requests" ? (
        <div className="overflow-hidden rounded-lg border border-espresso/10 bg-white shadow-sm">
          <div className="grid gap-4 p-5">
            {requests.map((request) => (
              <div key={request.id} className="grid gap-4 rounded-md border border-espresso/10 p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="font-semibold text-espresso">{request.full_name} · {request.phone}</p>
                  <p className="mt-1 text-sm text-espresso/65">{requestLabel(request.request_type)} {request.product_name ? `· ${request.product_name}` : ""}</p>
                  {request.message ? <p className="mt-2 text-sm text-espresso/65">{request.message}</p> : null}
                  <p className="mt-2 text-xs text-espresso/45">{new Date(request.created_at).toLocaleString()}</p>
                </div>
                <select value={request.status} onChange={(event) => updateStatus(request.id, event.target.value as RequestStatus)} className="rounded-full border border-espresso/15 px-4 py-2 text-sm">
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            ))}
            {!requests.length ? <p className="py-8 text-center text-espresso/60">No requests yet.</p> : null}
          </div>
        </div>
      ) : null}

      {tab === "products" ? (
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <form onSubmit={saveProduct} className="grid gap-4 rounded-lg border border-espresso/10 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-serif text-2xl text-espresso"><PackagePlus size={22} /> {editing ? "Edit product" : "Add product"}</h2>
            <input name="name" defaultValue={values.name} required className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Product name" />
            <input name="slug" defaultValue={values.slug} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Slug, optional" />
            <select name="product_type" defaultValue={values.product_type} className="rounded-md border border-espresso/15 px-4 py-3">
              <option value="coffee">Coffee</option>
              <option value="machine">Machine sale</option>
              <option value="rental">Machine rental</option>
            </select>
            <input name="category" defaultValue={values.category} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Category" />
            <textarea name="description" defaultValue={values.description} required rows={4} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Description" />
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="origin" defaultValue={values.origin} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Origin" />
              <input name="roast_level" defaultValue={values.roast_level} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Roast level" />
              <input name="package_size" defaultValue={values.package_size} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Package size" />
              <input name="price" defaultValue={values.price} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Price" />
              <input name="rental_duration" defaultValue={values.rental_duration} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Rental duration" />
              <input name="sort_order" defaultValue={values.sort_order} type="number" className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Sort order" />
            </div>
            <textarea name="specsText" defaultValue={values.specsText} rows={3} className="rounded-md border border-espresso/15 px-4 py-3" placeholder={"Specs, one per line\nPower: 220V\nUse: Commercial"} />
            <input name="image_url" defaultValue={values.image_url} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Image URL, optional" />
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-espresso/25 px-4 py-3 text-sm text-espresso/70">
              <ImagePlus size={18} /> Upload product image
              <input name="image" type="file" accept="image/*" className="hidden" />
            </label>
            <label className="flex items-center gap-2 text-sm text-espresso"><input name="is_featured" type="checkbox" defaultChecked={values.is_featured} /> Featured</label>
            <label className="flex items-center gap-2 text-sm text-espresso"><input name="is_active" type="checkbox" defaultChecked={values.is_active} /> Active</label>
            <div className="flex gap-2">
              <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-5 py-3 font-semibold text-crema"><CheckCircle2 size={17} /> Save</button>
              {editing ? <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-espresso/15 px-5 py-3 text-espresso">Cancel</button> : null}
            </div>
          </form>

          <div className="grid gap-4">
            {products.map((product) => (
              <div key={product.id} className="grid gap-3 rounded-lg border border-espresso/10 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-semibold text-espresso">{product.name}</p>
                  <p className="text-sm text-espresso/60">{product.product_type} · {product.category || "No category"} · {product.price || "No price"}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(product)} className="rounded-full border border-espresso/15 p-2 text-espresso" aria-label="Edit product"><Pencil size={17} /></button>
                  <button onClick={() => deleteProduct(product.id)} className="rounded-full border border-red-200 p-2 text-red-700" aria-label="Delete product"><Trash2 size={17} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {tab === "testimonials" ? (
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <form onSubmit={saveTestimonial} className="grid gap-4 rounded-lg border border-espresso/10 bg-white p-5 shadow-sm">
            <h2 className="font-serif text-2xl text-espresso">Add testimonial</h2>
            <input name="customer_name" required className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Customer name" />
            <input name="role" className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Role or company" />
            <textarea name="quote" required rows={5} className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Review" />
            <button className="rounded-full bg-espresso px-5 py-3 font-semibold text-crema">Save testimonial</button>
          </form>
          <div className="grid gap-4">
            {testimonials.map((item) => (
              <blockquote key={item.id} className="rounded-lg border border-espresso/10 bg-white p-5 shadow-sm">
                <p className="text-espresso/75">"{item.quote}"</p>
                <footer className="mt-3 text-sm font-semibold text-espresso">{item.customer_name} {item.role ? `· ${item.role}` : ""}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      ) : null}

      {tab === "content" ? (
        <div className="grid gap-5">
          <div className="rounded-lg border border-espresso/10 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-serif text-2xl text-espresso"><BarChart3 size={22} /> Content blocks</h2>
            <p className="mt-2 text-sm text-espresso/60">Use stable keys like `home_about`, `roasting_intro`, or `contact_note` for editable business copy.</p>
          </div>
          <form onSubmit={(event) => saveContent(event)} className="grid gap-3 rounded-lg border border-espresso/10 bg-white p-5 shadow-sm md:grid-cols-[0.4fr_0.6fr]">
            <input name="block_key" required className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Block key" />
            <input name="title" required className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Title" />
            <textarea name="body" required rows={3} className="rounded-md border border-espresso/15 px-4 py-3 md:col-span-2" placeholder="Body copy" />
            <input name="image_url" className="rounded-md border border-espresso/15 px-4 py-3" placeholder="Image URL" />
            <button className="rounded-full bg-espresso px-5 py-3 font-semibold text-crema">Add block</button>
          </form>
          {contentBlocks.map((block) => (
            <form key={block.id} onSubmit={(event) => saveContent(event, block)} className="grid gap-3 rounded-lg border border-espresso/10 bg-white p-5 shadow-sm md:grid-cols-[0.4fr_0.6fr]">
              <input name="block_key" defaultValue={block.block_key} className="rounded-md border border-espresso/15 px-4 py-3" />
              <input name="title" defaultValue={block.title} className="rounded-md border border-espresso/15 px-4 py-3" />
              <textarea name="body" defaultValue={block.body} rows={3} className="rounded-md border border-espresso/15 px-4 py-3 md:col-span-2" />
              <input name="image_url" defaultValue={block.image_url || ""} className="rounded-md border border-espresso/15 px-4 py-3" />
              <button className="rounded-full border border-espresso/15 px-5 py-3 font-semibold text-espresso">Update block</button>
            </form>
          ))}
        </div>
      ) : null}
    </div>
  );
}
