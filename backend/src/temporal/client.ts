import { env } from "@/env";
import { Client, Connection } from "@temporalio/client";

const connection = await Connection.connect({
	address: env.TEMPORAL_ADDRESS,
});

export const temporal = new Client({
	connection,
});
