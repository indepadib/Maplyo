import { NextResponse } from "next/server";

// Database/configuration failures must never look like a disconnected account.
export function withIntegrationErrors(handler: (request: Request) => Promise<Response>) {
  return async (request: Request) => {
    try {
      return await handler(request);
    } catch {
      return NextResponse.json(
        { error: "Integration storage unavailable. Check the database migrations and server configuration." },
        { status: 503 }
      );
    }
  };
}
