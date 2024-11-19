import type { ClientToServerEvents, ServerToClientEvents } from "backend";
import { io, Socket } from "socket.io-client";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:2997",
);
