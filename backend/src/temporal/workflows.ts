import type { user } from "@/db/schema";
import type * as activities from "@/temporal/activities";
import { proxyActivities } from "@temporalio/workflow";

const { greet, createUser, sendWelcomeEmail } = proxyActivities<
	typeof activities
>({
	startToCloseTimeout: "1 minute",
});

export async function example(name: string): Promise<string> {
	return await greet(name);
}

export async function createUserWorkflow(lol: typeof user.$inferInsert) {
	await createUser(lol);
}
