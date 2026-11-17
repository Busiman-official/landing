import { NextResponse } from "next/server";

/** Forwards website form submissions to the Busiman API, which emails them to the team inbox. */
export async function POST(req: Request) {
  const base = process.env.SERVICE_API_BASE_URL?.trim().replace(/\/+$/, "");
  if (!base) {
    return NextResponse.json({ success: false }, { status: 503 });
  }
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  try {
    const res = await fetch(`${base}/api/v1/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    return NextResponse.json({ success: res.ok }, { status: res.ok ? 200 : res.status });
  } catch {
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
