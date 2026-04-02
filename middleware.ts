import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/session";

const publicPaths = ["/login", "/register", "/recover-password", "/change-password"];

async function getSession(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession(request);

  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith("/api") || pathname.startsWith("/_next"));

  if (session) {
    if (pathname === "/login" || pathname === "/register" || pathname === "/recover-password") {
      return NextResponse.redirect(new URL("/notes", request.url));
    }
  } else {
    const isProtectedPath = pathname.startsWith("/notes") || 
                           pathname.startsWith("/history") || 
                           pathname.startsWith("/profile") || 
                           pathname.startsWith("/admin") ||
                           pathname === "/";
    
    if (isProtectedPath && !pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};