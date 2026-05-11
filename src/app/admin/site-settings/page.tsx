import Link from "next/link";
import { updateSiteSettings } from "@/actions/siteSettings";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminSiteSettingsPage() {
  const settings: any = await getSiteSettings();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Site Configuration
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your brand identity, theme, and contact information.
            </p>
          </div>
          <Link className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all" href="/admin">
            ← Dashboard
          </Link>
        </div>

        <form
          action={updateSiteSettings}
          className="space-y-8"
        >
          {/* Brand & Theme Section */}
          <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Visual Identity & Theme</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <div className="text-sm font-bold text-slate-700 mb-1">Company Name</div>
                  <input
                    name="companyName"
                    defaultValue={settings.companyName || "Palcotech Engineering"}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                  />
                </label>
                <label className="block">
                  <div className="text-sm font-bold text-slate-700 mb-1">Logo URL</div>
                  <input
                    name="logoUrl"
                    defaultValue={settings.logoUrl || ""}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                  />
                </label>
                
                <div className="sm:col-span-2 grid gap-6 sm:grid-cols-3">
                  <label className="block">
                    <div className="text-sm font-bold text-slate-700 mb-1">Primary Color</div>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        name="primaryColor"
                        defaultValue={settings.primaryColor || "#0f172a"}
                        className="h-10 w-12 rounded-lg border border-slate-200 p-1 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.primaryColor || "#0f172a"}
                        readOnly
                        className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono bg-slate-50"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <div className="text-sm font-bold text-slate-700 mb-1">Accent Color</div>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        name="accentColor"
                        defaultValue={settings.accentColor || "#f59e0b"}
                        className="h-10 w-12 rounded-lg border border-slate-200 p-1 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.accentColor || "#f59e0b"}
                        readOnly
                        className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono bg-slate-50"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <div className="text-sm font-bold text-slate-700 mb-1">Hero Overlay Color</div>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        name="heroOverlayColor"
                        defaultValue={settings.heroOverlayColor || "#000000"}
                        className="h-10 w-12 rounded-lg border border-slate-200 p-1 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.heroOverlayColor || "#000000"}
                        readOnly
                        className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono bg-slate-50"
                      />
                    </div>
                  </label>
                </div>

                <label className="block sm:col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm font-bold text-slate-700">Hero Overlay Opacity</div>
                    <span className="text-xs font-mono font-bold text-sky-600">{(settings.heroOverlayOpacity || 0.5)}</span>
                  </div>
                  <input
                    type="range"
                    name="heroOverlayOpacity"
                    min="0"
                    max="1"
                    step="0.05"
                    defaultValue={settings.heroOverlayOpacity || 0.5}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
                    <span>Transparent</span>
                    <span>Solid</span>
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Contact & Communication</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <div className="text-sm font-bold text-slate-700 mb-1">Phone Numbers</div>
                  <input
                    name="phones"
                    defaultValue={(settings.phones || []).join(", ")}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                    placeholder="+91 98765 43210, +91 12345 67890"
                  />
                </label>
                <label className="block">
                  <div className="text-sm font-bold text-slate-700 mb-1">Email Address</div>
                  <input
                    name="email"
                    defaultValue={settings.email || ""}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <div className="text-sm font-bold text-slate-700 mb-1">Office Address</div>
                  <textarea
                    name="address"
                    defaultValue={settings.address || ""}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                    rows={3}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <div className="text-sm font-bold text-slate-700 mb-1">Google Maps Link</div>
                  <input
                    name="googleMapsEmbedUrl"
                    defaultValue={settings.googleMapsEmbedUrl || ""}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                    placeholder="https://www.google.com/maps/embed?..."
                  />
                </label>

                <div className="sm:col-span-2 grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <div className="text-sm font-bold text-slate-700 mb-1">WhatsApp Number</div>
                    <input
                      name="whatsappNumber"
                      defaultValue={settings.whatsappNumber || ""}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </label>
                  <label className="block">
                    <div className="text-sm font-bold text-slate-700 mb-1">Working Hours</div>
                    <input
                      name="workingHours"
                      defaultValue={settings.workingHours || ""}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                      placeholder="Mon–Sat 10:00–18:00"
                    />
                  </label>
                </div>

                <label className="block sm:col-span-2">
                  <div className="text-sm font-bold text-slate-700 mb-1">Default WhatsApp Message</div>
                  <input
                    name="whatsappMessage"
                    defaultValue={settings.whatsappMessage || ""}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                  />
                </label>
                
                <label className="block">
                  <div className="text-sm font-bold text-slate-700 mb-1">GST Number</div>
                  <input
                    name="gstNumber"
                    defaultValue={settings.gstNumber || ""}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                  />
                </label>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4">
            <button 
              type="submit"
              className="rounded-2xl bg-sky-600 px-10 py-4 text-sm font-bold text-white shadow-xl shadow-sky-600/20 transition-all hover:bg-sky-700 active:scale-95"
            >
              Update Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
