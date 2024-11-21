import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "@/lib/better-auth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending } = useSession();
  if (isPending) return null;

  if (!data) return <Navigate to="/sign-in" />;

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
