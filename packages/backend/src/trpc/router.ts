import { z } from "zod";
import { auth } from "../better-auth/client";
import { env } from "../env";
import { prisma } from "../prisma/client";
import { temporal } from "../temporal/client";
import * as workflows from "../temporal/workflows";
import { procedure, router } from "./utils";

export const appRouter = router({});

export type AppRouter = typeof appRouter;
