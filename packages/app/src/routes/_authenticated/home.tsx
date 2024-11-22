import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket.io";
import { createFileRoute } from "@tanstack/react-router";
import { Session, User } from "better-auth/types";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pong, setPong] = useState<{ session: Session; user: User } | null>(
    null,
  );

  useEffect(() => {
    socket.on("pong", (data) => {
      setPong(data);
    });
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(pong, null, 2)}</pre>
      <Button onClick={() => socket.emit("ping")}>Ping</Button>
    </div>
  );
}
