import { db } from "@/db/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	trustedOrigins: ["http://localhost:3001"],
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
});
