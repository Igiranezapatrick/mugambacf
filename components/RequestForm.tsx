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
    <form onSubmit={submit} className={compact ? "grid gap-6" : "grid gap-6 border border-espresso/15 bg-white p-8 shadow-lg"}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-bold uppercase tracking-[0.25em] text-roast">{requestLabel(requestType)}</p>
          <h3 className="mt-2 font-serif text-3xl text-espresso tracking-tight">{product?.name || "Send a request"}</h3>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} className="border border-espresso/15 p-3 text-espresso/70 transition hover:bg-crema hover:text-espresso" aria-label="Close request form">
            <X size={24} />
          </button>
        ) : null}
      </div>

      <label className="grid gap-3 text-base font-bold uppercase tracking-wider text-espresso">
        Full name
        <input name="fullName" className="border border-espresso/20 bg-crema/20 px-5 py-4 text-lg outline-none focus:border-brass transition" placeholder="Your full name" />
      </label>
      <label className="grid gap-3 text-base font-bold uppercase tracking-wider text-espresso">
        Phone number
        <input name="phone" className="border border-espresso/20 bg-crema/20 px-5 py-4 text-lg outline-none focus:border-brass transition" placeholder="+250..." />
      </label>
      {requestType === "machine_rental" ? (
        <label className="grid gap-3 text-base font-bold uppercase tracking-wider text-espresso">
          Duration needed
          <input name="rentalDuration" className="border border-espresso/20 bg-crema/20 px-5 py-4 text-lg outline-none focus:border-brass transition" placeholder="Daily, weekly, monthly..." />
        </label>
      ) : null}
      <label className="grid gap-3 text-base font-bold uppercase tracking-wider text-espresso">
        Optional message
        <textarea name="message" rows={4} className="border border-espresso/20 bg-crema/20 px-5 py-4 text-lg outline-none focus:border-brass transition" placeholder="Tell us what you need" />
      </label>
      {error ? <p className="border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700 font-bold">{error}</p> : null}
      {!supabase ? (
        <p className="border border-brass/20 bg-brass/10 px-4 py-3 text-sm leading-relaxed text-espresso/80">
          Supabase is not configured yet, so this demo will open WhatsApp only. Add the anon key in `.env.local` to save requests.
        </p>
      ) : null}
      <button type="submit" disabled={status === "saving"} className="inline-flex items-center justify-center gap-4 bg-roast px-8 py-5 text-lg font-bold uppercase tracking-widest text-white transition hover:bg-espresso disabled:cursor-not-allowed disabled:opacity-60">
        <MessageCircle size={24} />
        {status === "saving" ? "Saving..." : status === "done" ? "WhatsApp (Open Again)" : "Submit & Continue"}
      </button>
    </form>
  );
}
