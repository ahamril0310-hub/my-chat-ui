import { NextResponse } from "next/server";

export async function POST(req) {
  const { image } = await req.json();

  // Simulate analysis
  const simulatedResponse = "Image received successfully. AI will analyze this later.";

  return NextResponse.json({
    status: "ok",
    analysis: simulatedResponse,
    receivedAt: new Date().toISOString(),
  });
}
