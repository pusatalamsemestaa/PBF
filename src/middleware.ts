// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import withAuth from "./Middleware/withAuth"; // Sesuaikan folder Anda

export async function mainMiddleware(req: NextRequest) {
  return NextResponse.next();
}

export default withAuth(mainMiddleware, [
  "/admin",
  "/dashboard",
  "/profile",
]);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/profile/:path*"],
};