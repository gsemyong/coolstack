import { initTRPC, TRPCError } from "@trpc/server";
import { SuperJSON } from "superjson";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const procedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.auth) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
      ctx: {
        auth: ctx.auth,
      },
    });
  }),
);

export const router = t.router;
