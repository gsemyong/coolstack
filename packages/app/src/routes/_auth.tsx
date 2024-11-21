import { useSession } from "@/lib/better-auth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending } = useSession();

  if (isPending) return null;

  if (data) return <Navigate to="/" />;

  return <Outlet />;
}
