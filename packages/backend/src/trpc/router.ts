import { z } from "zod";
import { auth } from "../better-auth";
import { env } from "../env";
import { prisma } from "../prisma";
import { temporal, workflows } from "../temporal";
import { protectedProcedure, router } from "./utilts";

export const appRouter = router({
  getUserEmail: protectedProcedure.query(async ({ ctx }) => {
    return ctx.auth.user.email;
  }),
  getPosts: protectedProcedure.query(async ({ ctx }) => {
    const posts = await prisma.post.findMany();
    return posts;
  }),
});

export type AppRouter = typeof appRouter;
