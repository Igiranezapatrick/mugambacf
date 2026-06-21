import type { RequestType } from "./types";

const ownerNumber = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "250787793722";

const labels: Record<RequestType, string> = {
  coffee_order: "Coffee order",
  machine_purchase: "Coffee machine purchase",
  machine_rental: "Coffee machine rental",
  roasting_service: "Coffee roasting service",
  contact: "General inquiry"
};

export function buildWhatsAppUrl(input: {
  requestType: RequestType;
  fullName: string;
  phone: string;
  productName?: string | null;
  message?: string | null;
  rentalDuration?: string | null;
}) {
  const lines = [
    `Hello Mugamba Coffee Factory, I would like help with: ${labels[input.requestType]}.`,
    `Name: ${input.fullName}`,
    `Phone: ${input.phone}`,
    input.productName ? `Product/Service: ${input.productName}` : null,
    input.rentalDuration ? `Duration: ${input.rentalDuration}` : null,
    input.message ? `Message: ${input.message}` : null
  ].filter(Boolean);

  return `https://wa.me/${ownerNumber.replace(/\D/g, "")}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function requestLabel(type: RequestType) {
  return labels[type];
}
