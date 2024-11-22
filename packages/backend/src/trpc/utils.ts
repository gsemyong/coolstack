import { initTRPC } from "@trpc/server";
import { SuperJSON } from "superjson";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const procedure = t.procedure;

export const router = t.router;
