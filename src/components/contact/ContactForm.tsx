"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const Schema = z.object({
  productLookingFor: z.string().optional(),
  name: z.string().optional(),
  mobile: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^[0-9+\-\s]{8,20}$/.test(v),
      "Please enter a valid mobile number.",
    ),
});

type FormValues = z.infer<typeof Schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { productLookingFor: "", name: "", mobile: "" },
  });

  async function onSubmit(values: FormValues) {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Failed to submit. Please try again.");
      return;
    }

    toast.success("Submitted successfully. We will contact you soon.");
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-slate-200/70 bg-white/75 p-6 shadow-sm backdrop-blur"
    >
      <div className="text-lg font-semibold text-slate-900">Send Inquiry</div>
      <p className="mt-1 text-sm text-slate-600">
        All fields are optional. Submit with as much detail as you have.
      </p>

      <div className="mt-5 space-y-4">
        <label className="block">
          <div className="text-sm font-medium text-slate-700">Product looking for</div>
          <input
            {...register("productLookingFor")}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
            placeholder="e.g., Electric Motor / Pump / Gearbox..."
          />
        </label>

        <label className="block">
          <div className="text-sm font-medium text-slate-700">Name</div>
          <input
            {...register("name")}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <div className="text-sm font-medium text-slate-700">Mobile number</div>
          <input
            {...register("mobile")}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
            placeholder="Your mobile number"
          />
          {errors.mobile ? (
            <div className="mt-1 text-xs text-red-600">{errors.mobile.message}</div>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
