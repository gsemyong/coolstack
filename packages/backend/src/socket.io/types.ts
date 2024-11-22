export interface ServerToClientEvents {
  pong: (data: { message: string }) => void;
}

export interface ClientToServerEvents {
  ping: () => void;
}

export interface InterServerEvents {}

export interface SocketData {}
