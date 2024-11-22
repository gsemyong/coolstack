import type { Session, User } from "better-auth/types";

export interface ServerToClientEvents {
  pong: (data: { session: Session; user: User }) => void;
}

export interface ClientToServerEvents {
  ping: () => void;
}

export interface InterServerEvents {}

export interface SocketData {}
