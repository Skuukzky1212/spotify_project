import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {  // if user is logged in this app => token exist!
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl; 
  // request allowed when
  // (1) token exist
  // (2) request for nextAuth session/ provider
  // (3) request for "/_next/" (render files local in /_next/static/)
  
  if (token || pathname.includes("/api/auth") || pathname.includes("/_next")) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};


