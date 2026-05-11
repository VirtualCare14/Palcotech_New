import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { NavbarClient } from "@/components/NavbarClient";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ToasterProvider } from "@/components/ToasterProvider";
import { siteConfig } from "@/config/site";
import { getNavbarCategories, getSiteSettings } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Palcotech Engineering",
  description: "Palcotech Engineering – premium professional engineering products and services.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings: any = await getSiteSettings().catch(() => null);
  const categories = await getNavbarCategories().catch(() => []);

  const companyName = settings?.companyName || siteConfig.companyName;
  const logoUrl = settings?.logoUrl || siteConfig.logoUrl;
  const phones: string[] = (settings?.phones?.length ? settings.phones : [siteConfig.phone]).filter(Boolean);

  const whatsappNumber = settings?.whatsappNumber || siteConfig.whatsappNumber;
  const whatsappMessage = settings?.whatsappMessage || siteConfig.whatsappMessage;

  const email = settings?.email || siteConfig.email;
  const address = settings?.address || siteConfig.address;
  const gstNumber = settings?.gstNumber || siteConfig.gstNumber;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${settings?.primaryColor || "#0f172a"};
            --accent: ${settings?.accentColor || "#f59e0b"};
            --hero-overlay: ${settings?.heroOverlayColor ? `${settings.heroOverlayColor}${Math.round((settings.heroOverlayOpacity || 0.5) * 255).toString(16).padStart(2, '0')}` : 'rgba(0,0,0,0.5)'};
          }
        `}} />
      </head>
      <body className="min-h-dvh overflow-x-hidden flex flex-col pt-0">
        <NavbarClient
          companyName={companyName}
          logoUrl={logoUrl}
          phone={phones[0]}
          categories={categories}
        />
        <main className="flex-1 relative">{children}</main>
        <Footer
          companyName={companyName}
          gstNumber={gstNumber}
          email={email}
          phones={phones}
          address={address}
        />
        <WhatsAppButton
          whatsappNumber={whatsappNumber}
          message={whatsappMessage}
        />
        <ToasterProvider />
      </body>
    </html>
  );
}
