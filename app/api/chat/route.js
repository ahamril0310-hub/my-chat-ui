import { NextResponse } from "next/server";

export async function POST(req) {
  const { message } = await req.json();

  // Simulate processing (replace with model later)
  const simulatedResponse = `Received: "${message}" — (AI model will process this here)`;

  return NextResponse.json({
    reply: simulatedResponse,
    timestamp: new Date().toISOString(),
  });
}
