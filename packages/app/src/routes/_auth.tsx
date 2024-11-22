import { useSession } from "@/lib/better-auth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const session = useSession();

  if (session.isPending) return null;

  if (session.data) return <Navigate to="/home" />;

  return <Outlet />;
}
