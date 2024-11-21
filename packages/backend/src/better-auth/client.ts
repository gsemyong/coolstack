import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma/client";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:3001"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
