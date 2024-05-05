import { APIResponse } from "@/types/response";
import { answer } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  return answer("Under development.", 500);
}
