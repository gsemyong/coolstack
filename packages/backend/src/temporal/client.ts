import { Client, Connection } from "@temporalio/client";
import { env } from "../env";

const connection = await Connection.connect({
  address: env.TEMPORAL_ADDRESS,
});

export const temporal = new Client({
  connection,
});
