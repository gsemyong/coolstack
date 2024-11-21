import { createServer } from "http";
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types";

const httpServer = createServer();
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "http://localhost:3001",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "OPTIONS"],
    exposedHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  },
});

io.use((socket, next) => {
  next();
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(2997, () => {
  console.log("Socket.io server is running on port 2997");
});
