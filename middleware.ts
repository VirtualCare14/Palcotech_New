import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/login")) return NextResponse.next();
  if (pathname.startsWith("/_next") || pathname.startsWith("/api/auth")) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  const allowed =
    pathname === "/admin" ||
    pathname.startsWith("/admin/products") ||
    pathname.startsWith("/admin/featured") ||
    pathname.startsWith("/admin/hot") ||
    pathname.startsWith("/admin/home-content") ||
    pathname.startsWith("/admin/about-content") ||
    pathname.startsWith("/admin/site-settings") ||
    pathname.startsWith("/admin/categories") ||
    pathname.startsWith("/admin/media");

  if (!allowed) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
