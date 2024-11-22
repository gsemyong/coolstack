import { createServer } from "http";
import { fromNodeHeaders } from "better-auth/node";
import { Server } from "socket.io";
import { auth } from "../better-auth/client";
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

io.on("connection", async (socket) => {
  const authData = await auth.api.getSession({
    headers: fromNodeHeaders(socket.handshake.headers),
  });

  if (!authData) {
    return socket.disconnect();
  }

  const { session, user } = authData;

  console.log(session, user);

  socket.on("ping", () => {
    socket.emit("pong", {
      message: "Hi from the server!",
    });
  });
});

httpServer.listen(2997, () => {
  console.log("Socket.io server is running on port 2997");
});
