import { createContext } from "@/trpc/context";
import { appRouter } from "@/trpc/router";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

createHTTPServer({
  middleware: cors({
    origin: "http://localhost:3001",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "OPTIONS"],
    exposedHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
  router: appRouter,
  createContext,
}).listen(3000, () => {
  console.log("TRPC server is running on port 3000");
});
