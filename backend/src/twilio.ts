import { env } from "@/env";
import createTwilioClient from "twilio";

export const twilio = createTwilioClient(
	env.TWILIO_ACCOUNT_SID,
	env.TWILIO_AUTH_TOKEN,
);
