import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { socket } from "@/lib/socket.io";
import { createFileRoute } from "@tanstack/react-router";
import { ServerToClientEvents } from "backend";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const { toast } = useToast();

  useEffect(() => {
    socket.on("pong", (data) => {
      toast({
        title: "You've got a new message",
        description: data.message,
      });
    });
  }, []);

  return (
    <div>
      <Button onClick={() => socket.emit("ping")}>Ping</Button>
    </div>
  );
}
