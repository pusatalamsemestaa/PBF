import { getToken } from "next-auth/jwt";
// Tambahkan NextMiddleware di baris bawah ini
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(
  middleware: NextMiddleware, // Sekarang TypeScript sudah mengenali tipe ini
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      
      if (!token) {
        const loginUrl = new URL("/login", req.url);
        // Opsional: tambahkan callbackUrl agar user kembali ke halaman asal setelah login
        loginUrl.searchParams.set("callbackUrl", encodeURI(req.url));
        
        return NextResponse.redirect(loginUrl);
      }
    }

    return middleware(req, next);
  };
}