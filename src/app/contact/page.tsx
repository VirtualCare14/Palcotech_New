import { Container } from "@/components/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  return (
    <div className="bg-transparent">
      <Container className="py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-slate-900">Contact Us</h1>
          <p className="text-sm text-slate-600">
            Reach out for product enquiries, quotes, or support. Contact details
            are managed globally from the admin panel.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold text-slate-900">
                Contact Details
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {siteConfig.address ? (
                  <div>
                    <span className="font-semibold text-slate-800">Address:</span>{" "}
                    {siteConfig.address}
                  </div>
                ) : null}
                {siteConfig.phone ? (
                  <div>
                    <span className="font-semibold text-slate-800">Phone:</span>{" "}
                    <a className="hover:text-sky-700" href={`tel:${siteConfig.phone}`}>
                      +91 9811744979
                    </a>
                  </div>
                ) : null}
                {siteConfig.email ? (
                  <div>
                    <span className="font-semibold text-slate-800">Email:</span>{" "}
                    <a className="hover:text-sky-700" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                  </div>
                ) : null}
                {siteConfig.whatsappNumber ? (
                  <div>
                    <span className="font-semibold text-slate-800">WhatsApp:</span>{" "}
                    {siteConfig.whatsappNumber}
                  </div>
                ) : null}
                {siteConfig.workingHours ? (
                  <div>
                    <span className="font-semibold text-slate-800">Working Hours:</span>{" "}
                    {siteConfig.workingHours}
                  </div>
                ) : null}
                {siteConfig.gstNumber ? (
                  <div>
                    <span className="font-semibold text-slate-800">GST:</span>{" "}
                    {siteConfig.gstNumber}
                  </div>
                ) : null}
              </div>

              {siteConfig.googleMapsEmbedUrl ? (
                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white/80">
                  <iframe
                    title="Google Maps"
                    src={siteConfig.googleMapsEmbedUrl}
                    className="h-64 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
                  Google Maps embed link can be added in <span className="font-semibold">src/config/site.ts</span>.
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
