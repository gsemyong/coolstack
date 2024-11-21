import http from "http";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./client";

const server = http.createServer((req, res) => {
  // Apply CORS middleware first
  cors({
    origin: "http://localhost:3001",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "OPTIONS"],
    exposedHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })(req, res, () => {
    // Then handle the auth request
    toNodeHandler(auth)(req, res);
  });
});

server.listen(2998, () => {
  console.log("Auth server is running on port 2998");
});
