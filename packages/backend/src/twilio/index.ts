import createTwilioClient from "twilio";
import { env } from "../env";

export const twilio = createTwilioClient(
  env.TWILIO_ACCOUNT_SID,
  env.TWILIO_AUTH_TOKEN,
);
