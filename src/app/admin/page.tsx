import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/admin/login?from=/admin");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Signed in as <span className="font-medium">{session?.user?.email}</span>
              </p>
            </div>
            <LogoutButton />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/admin/products", label: "Products", description: "Create and manage product data." },
              { href: "/admin/categories", label: "Categories", description: "Manage categories shown in navbar + products." },
              { href: "/admin/featured", label: "Featured", description: "Select the homepage featured items." },
              { href: "/admin/hot", label: "Hot Products", description: "Select the highest demand products." },
              { href: "/admin/home-content", label: "Homepage", description: "Update hero, slider and company highlights." },
              { href: "/admin/about-content", label: "About Page", description: "Edit the About Us messaging and mission." },
              { href: "/admin/site-settings", label: "Site Settings", description: "Update contact, branding and footer details." },
              { href: "/admin/media", label: "Media", description: "Upload images/files to Cloudinary and reuse URLs." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5 transition hover:border-sky-200 hover:bg-white"
              >
                <div className="text-lg font-semibold text-slate-900">{item.label}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{item.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
