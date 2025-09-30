import { type NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const proxiedOrigin = process.env.PROXIED_ORIGIN ?? "";
  const bypassToken = process.env.BYPASS_TOKEN ?? "";
  const pathAndQuery = request.nextUrl.href.replace(request.nextUrl.origin, "");

  const url = new URL(pathAndQuery, proxiedOrigin);

  const headers = new Headers(request.headers);
  headers.set("x-vercel-protection-bypass", bypassToken);

  return NextResponse.rewrite(url, {
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: "/:path*",
};
