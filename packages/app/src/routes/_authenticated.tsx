import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSession } from "@/lib/better-auth";
import { getCookie } from "@/lib/utils";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  const session = useSession();

  if (session.isPending) return null;

  if (!session.data) return <Navigate to="/sign-in" />;

  const defaultOpen = getCookie("sidebar:state") === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
