import { NextResponse, type NextRequest } from "next/server";

const BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const backendPath = url.pathname.replace(/^\/api/, "");
  const backendUrl = `${BASE_URL}${backendPath}`;
  const body = await request.text();

  const response = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const responseText = await response.text();
  const responseHeaders: Record<string, string> = {
    "Content-Type": response.headers.get("content-type") || "application/json",
  };

  return new NextResponse(responseText, {
    status: response.status,
    headers: responseHeaders,
  });
}
