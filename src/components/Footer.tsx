import Link from "next/link";
import { Container } from "@/components/Container";

export function Footer({
  companyName,
  gstNumber,
  email,
  phones,
  address,
}: {
  companyName: string;
  gstNumber?: string;
  email?: string;
  phones?: string[];
  address?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95 text-slate-200">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="text-lg font-semibold text-white">
              {companyName}
            </div>
            <p className="mt-2 text-sm text-slate-300">
              Premium engineering products with professional service and fast
              delivery.
            </p>
            {gstNumber ? (
              <div className="mt-4 text-sm text-slate-200">
                <span className="font-semibold text-slate-100">GST:</span>{" "}
                {gstNumber}
              </div>
            ) : null}
          </div>

          <div>
            <div className="text-sm font-semibold text-white">
              Quick Contact
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              {phones?.length ? (
                <div>
                  <span className="font-medium text-slate-100">Phone:</span>{" "}
                  <a className="hover:text-cyan-300" href={`tel:${phones[0]}`}>
                    {phones[0]}
                  </a>
                </div>
              ) : null}
              {email ? (
                <div>
                  <span className="font-medium text-slate-100">Email:</span>{" "}
                  <a className="hover:text-cyan-300" href={`mailto:${email}`}>
                    {email}
                  </a>
                </div>
              ) : null}
              {address ? (
                <div>
                  <span className="font-medium text-slate-100">Address:</span>{" "}
                  {address}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">
              General Links
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <Link className="block text-slate-300 hover:text-cyan-300" href="/">
                Home
              </Link>
              <Link
                className="block text-slate-300 hover:text-cyan-300"
                href="/about"
              >
                About Us
              </Link>
              <Link
                className="block text-slate-300 hover:text-cyan-300"
                href="/products"
              >
                Products
              </Link>
              <Link
                className="block text-slate-300 hover:text-cyan-300"
                href="/contact"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">
              Product Links
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <Link
                className="block text-slate-300 hover:text-cyan-300"
                href="/products"
              >
                All Products
              </Link>
              <div className="text-sm text-slate-400">
                Featured and hot products are managed from the admin panel.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            © {year} {companyName}. All rights reserved. Developed by Orange Virtual Global Solutions Pvt Ltd
          </div>
          <Link className="hover:text-cyan-300" href="/admin">
            Admin
          </Link>
        </div>
      </Container>
    </footer>
  );
}
