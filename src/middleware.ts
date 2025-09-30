import { type NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const proxiedOrigin = process.env.PROXIED_ORIGIN ?? "";
  const bypassToken = process.env.BYPASS_TOKEN ?? "";
  const pathAndQuery = request.nextUrl.href.replace(request.nextUrl.origin, "");
  const url = new URL(pathAndQuery, proxiedOrigin);
  console.log(url.href);
  return NextResponse.rewrite(url, {
    headers: {
      "x-vercel-protection-bypass": bypassToken,
    },
  });
}

export const config = {
  matcher: "/:path*",
};
