import { auth } from "@/lib/auth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending } = auth.useSession();

  if (isPending) return null;

  if (data) return <Navigate to="/" />;

  return <Outlet />;
}
