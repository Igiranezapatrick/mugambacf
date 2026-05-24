"use client";

import { RequestForm } from "./RequestForm";
import type { Product, RequestType } from "@/lib/types";

type RequestModalProps = {
  product: Product | null;
  requestType: RequestType;
  onClose: () => void;
};

export function RequestModal({ product, requestType, onClose }: RequestModalProps) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-espresso/70 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg">
        <RequestForm product={product} requestType={requestType} onClose={onClose} />
      </div>
    </div>
  );
}
