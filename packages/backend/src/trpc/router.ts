import { db } from "@/db/client";
import { post } from "@/db/schema";
import { env } from "@/env";
import { temporal } from "@/temporal/client";
import * as workflows from "@/temporal/workflows";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use(
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

export const appRouter = t.router({
  getUserEmail: protectedProcedure.query(async ({ ctx }) => {
    return ctx.auth.user.email;
  }),
  getPosts: publicProcedure.query(async () => {
    const posts = await db.query.post.findMany();

    return posts;
  }),
  addPost: publicProcedure
    .input(z.object({ title: z.string(), content: z.string().optional() }))
    .mutation(async ({ input }) => {
      await db.insert(post).values(input);
      await temporal.workflow.start(workflows.example, {
        args: [input.title],
        taskQueue: env.TEMPORAL_TASK_QUEUE,
        workflowId: `add-post-${input.title}`,
      });
    }),
});

export type AppRouter = typeof appRouter;
