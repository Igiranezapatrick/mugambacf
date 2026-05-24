"use client";

import { FormEvent, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { buildWhatsAppUrl, requestLabel } from "@/lib/whatsapp";
import { supabase } from "@/lib/supabase";
import type { Product, RequestType } from "@/lib/types";

type RequestFormProps = {
  requestType: RequestType;
  product?: Product | null;
  compact?: boolean;
  onClose?: () => void;
};

export function RequestForm({ requestType, product, compact = false, onClose }: RequestFormProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const message = String(form.get("message") || "").trim();
    const rentalDuration = String(form.get("rentalDuration") || "").trim();

    if (!fullName || !phone) {
      setError("Please add your full name and phone number.");
      return;
    }

    setStatus("saving");
    setError("");

    if (supabase) {
      const productId = product?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(product.id) ? product.id : null;
      const { error: insertError } = await supabase.from("requests").insert({
        full_name: fullName,
        phone,
        request_type: requestType,
        product_id: productId,
        product_name: product?.name || null,
        message,
        rental_duration: requestType === "machine_rental" ? rentalDuration : null,
        status: "pending"
      });

      if (insertError) {
        setStatus("error");
        setError(insertError.message);
        return;
      }
    }

    setStatus("done");
    const url = buildWhatsAppUrl({
      requestType,
      fullName,
      phone,
      productName: product?.name,
      message,
      rentalDuration
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={submit} className={compact ? "grid gap-4" : "grid gap-4 rounded-lg border border-espresso/10 bg-white p-5 shadow-soft"}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-roast">{requestLabel(requestType)}</p>
          <h3 className="mt-1 font-serif text-2xl text-espresso">{product?.name || "Send a request"}</h3>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} className="rounded-full border border-espresso/10 p-2 text-espresso/70 transition hover:text-espresso" aria-label="Close request form">
            <X size={18} />
          </button>
        ) : null}
      </div>

      <label className="grid gap-2 text-sm font-medium text-espresso">
        Full name
        <input name="fullName" className="rounded-md border border-espresso/15 bg-crema/40 px-4 py-3 outline-none ring-brass/30 transition focus:ring-4" placeholder="Your full name" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-espresso">
        Phone number
        <input name="phone" className="rounded-md border border-espresso/15 bg-crema/40 px-4 py-3 outline-none ring-brass/30 transition focus:ring-4" placeholder="+250..." />
      </label>
      {requestType === "machine_rental" ? (
        <label className="grid gap-2 text-sm font-medium text-espresso">
          Duration needed
          <input name="rentalDuration" className="rounded-md border border-espresso/15 bg-crema/40 px-4 py-3 outline-none ring-brass/30 transition focus:ring-4" placeholder="Daily, weekly, monthly..." />
        </label>
      ) : null}
      <label className="grid gap-2 text-sm font-medium text-espresso">
        Optional message
        <textarea name="message" rows={4} className="rounded-md border border-espresso/15 bg-crema/40 px-4 py-3 outline-none ring-brass/30 transition focus:ring-4" placeholder="Tell us what you need" />
      </label>
      {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      {!supabase ? (
        <p className="rounded-md bg-brass/10 px-3 py-2 text-xs leading-5 text-espresso/70">
          Supabase is not configured yet, so this demo will open WhatsApp only. Add the anon key in `.env.local` to save requests.
        </p>
      ) : null}
      <button type="submit" disabled={status === "saving"} className="inline-flex items-center justify-center gap-2 rounded-full bg-roast px-5 py-3 text-sm font-semibold text-white transition hover:bg-espresso disabled:cursor-not-allowed disabled:opacity-60">
        <MessageCircle size={17} />
        {status === "saving" ? "Saving request..." : status === "done" ? "Open WhatsApp again" : "Submit and Continue on WhatsApp"}
      </button>
    </form>
  );
}
