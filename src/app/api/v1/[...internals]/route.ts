import { mainEndpoint } from "@/handlers";
import { NextRequest } from "next/server";

async function handle(request: NextRequest) {
  const url = new URL(request.url);

  return await mainEndpoint.handle(request, url.pathname.replace("/api/v1/", ""));
}

export { handle as GET, handle as POST, handle as PUT, handle as DELETE };
