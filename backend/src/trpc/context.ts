import { auth } from "@/auth/client";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { fromNodeHeaders } from "better-auth/node";

export async function createContext({ req, res }: CreateHTTPContextOptions) {
	const authData = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});

	return { req, res, auth: authData };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
