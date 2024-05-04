import type { HandlerFuncType, HandlerMethods, HandlerType } from "@/types/handler";
import { Logger } from "@/utils/logger";
import { Pathname } from "@/utils/pathname";
import { answer } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

const defaultFallbackFn: HandlerFuncType<string> = async (req) => {
  const logger = new Logger("fallback");

  logger.warn("unhandled http request", req.method.toUpperCase(), new URL(req.url).pathname);

  return answer("Not found. ehe ~");
};

type Endpoints = { [key: string]: EndpointHandler };

class EndpointHandler {
  handlers: HandlerType;
  endpoints: Endpoints;
  fallbackFn: HandlerFuncType;
  supportedMethods: string[];

  constructor(endpoints: Endpoints = {}, handlers: HandlerType = {}, fallback?: HandlerFuncType) {
    this.handlers = handlers;
    this.endpoints = endpoints;
    this.fallbackFn = fallback ?? defaultFallbackFn;
    this.supportedMethods = ["GET", "POST", "PUT", "DELETE"];
  }

  async handle(request: NextRequest, pathname: string): Promise<NextResponse> {
    const method = request.method.toUpperCase();

    if (!this.supportedMethods.includes(method)) {
      return answer<string>(`Unsupported method: ${method}`);
    }

    const path = new Pathname(pathname);
    const currPath = path.currPath;
    const nextPath = path.nextPath;

    if (path.isLastPath) {
      // Call handler
      const handler = this.getHandler(currPath)[method as keyof HandlerMethods];

      if (!handler) {
        return this.fallbackFn(request);
      } else {
        return await handler(request);
      }
    } else {
      // Call endpoint handler
      const endpoint = this.getEndpoint(currPath);

      if (!endpoint) {
        return await this.fallbackFn(request);
      } else {
        return await endpoint.handle(request, nextPath ?? "");
      }
    }
  }

  getHandler(name: string): HandlerMethods {
    const keys = Object.keys(this.handlers);
    if (keys.includes(name)) {
      return this.handlers[name];
    } else {
      return {};
    }
  }

  getEndpoint(name: string): EndpointHandler | null {
    const keys = Object.keys(this.endpoints);
    if (keys.includes(name)) {
      return this.endpoints[name];
    } else {
      return null;
    }
  }
}

export { EndpointHandler };
