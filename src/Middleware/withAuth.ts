import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    const isProtected = requireAuth.some((path) =>
      pathname.startsWith(path)
    );

    if (isProtected) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // 🔒 Belum login
      if (!token) {
        const loginUrl = new URL("/auth/login", req.url);
        loginUrl.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(loginUrl);
      }

      // 🔥 Role check admin
      if (pathname.startsWith("/admin") && token.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // lanjut ke middleware utama
    const res = await middleware(req, next);
    return res || NextResponse.next();
  };
}