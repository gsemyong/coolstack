import { env } from "../env";
import * as activities from "./activities";
import "./workflows";
import { createRequire } from "module";
import { NativeConnection, Worker } from "@temporalio/worker";

export const require = createRequire(import.meta.url);

const connection = await NativeConnection.connect({
  address: env.TEMPORAL_ADDRESS,
});

const worker = await Worker.create({
  connection,
  namespace: env.TEMPORAL_NAMESPACE,
  taskQueue: env.TEMPORAL_TASK_QUEUE,
  workflowsPath: require.resolve("./workflows"),
  activities,
});

const shutdown = async () => {
  worker.shutdown();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

await worker.run();
