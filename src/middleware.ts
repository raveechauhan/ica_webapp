import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/home") {
    return NextResponse.next(); 
  }
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: ["/", "/home"],
};
