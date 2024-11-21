import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../better-auth/client";

export async function createContext({ req, res }: CreateHTTPContextOptions) {
  return {
    req,
    res,
    auth: await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    }),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
