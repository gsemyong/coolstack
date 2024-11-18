import type { user } from "@/db/schema";
import { resend } from "@/resend/client";

export async function greet(name: string): Promise<string> {
	return `Hello, ${name}!`;
}

export async function createUser(lol: typeof user.$inferInsert) {
	console.log("fkdajfl");
}

export async function sendWelcomeEmail(lol: typeof user.$inferSelect) {
	const { data, error } = await resend.emails.send({
		from: "Acme <onboarding@resend.dev>",
		to: [lol.email!],
		subject: "Welcome to Taskill!",
		text: "Welcome to Taskill!",
	});

	if (error) {
		return console.error({ error });
	}

	console.log({ data });
}
