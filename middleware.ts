import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: "/api/:path*",
};

export function middleware(request: NextRequest, res: NextResponse) {
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");
  const frontendOrigin = `${host}`;

  // if (!referer || !referer?.includes(frontendOrigin)) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  return NextResponse.next();
}

export default middleware;
