import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");
  if (address !== process.env.PERSONAL_ADDRESS) {
    return NextResponse.redirect("/");
  }
}

export const config = {
  matcher: "/[address]",
};
