"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton({
  whatsappNumber,
  message,
}: {
  whatsappNumber?: string;
  message?: string;
}) {
  if (!whatsappNumber) return null;

  const clean = whatsappNumber.replace(/[^\d]/g, "");
  const text = encodeURIComponent(
    message || "Hi, I have enquiry related to your product",
  );
  const href = `https://wa.me/${clean}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  );
}
