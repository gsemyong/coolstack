import { prisma } from "@/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:3001"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
