import { z } from "zod";

export const env = z
	.object({
		DATABASE_URL: z.string().url(),
		RESEND_API_KEY: z.string().min(1),
		TEMPORAL_ADDRESS: z.string().url(),
		TEMPORAL_NAMESPACE: z.string().min(1),
		TEMPORAL_TASK_QUEUE: z.string().min(1),
		TWILIO_ACCOUNT_SID: z.string().min(1),
		TWILIO_AUTH_TOKEN: z.string().min(1),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	})
	.parse(process.env);
