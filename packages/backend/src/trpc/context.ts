import { TRPCError } from "@trpc/server";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../better-auth/client";

export async function createContext({ req, res }: CreateHTTPContextOptions) {
  const authData = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!authData) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return {
    session: authData.session,
    user: authData.user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
