import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Backend routes are live.",
    time: new Date().toISOString(),
  });
}
