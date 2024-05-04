import { NextRequest, NextResponse } from "next/server";
import { APIResponse } from "./response";

export type HandlerFuncType<M = any> = (req: NextRequest) => Promise<NextResponse<APIResponse<M>>>;

export type HandlerMethods = {
  GET?: HandlerFuncType;
  POST?: HandlerFuncType;
  UPDATE?: HandlerFuncType;
  DELETE?: HandlerFuncType;
};

export type HandlerType = { [key: string]: HandlerMethods };
