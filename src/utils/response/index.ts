import { APIResponse } from "@/types/response";
import { NextResponse } from "next/server";

export function answer<M = any>(message: M, status: number = 200, init?: RequestInit) {
  return NextResponse.json<APIResponse<M>>({ ok: status < 400 ? true : false, message }, { status, ...init });
}
