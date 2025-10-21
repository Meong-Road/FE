import { NextRequest, NextResponse } from "next/server";

import { PATH } from "@/lib/constants/path";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL(PATH.REGULAR, request.url));
}

export const config = {
  matcher: "/",
};
