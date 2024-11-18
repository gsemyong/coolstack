import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";
import {
	httpBatchLink,
	loggerLink,
	splitLink,
	unstable_httpSubscriptionLink,
} from "@trpc/react-query";
import { useState } from "react";
import { SuperJSON } from "superjson";

export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, isPending } = auth.useSession();
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				loggerLink(),
				splitLink({
					condition: (op) => op.type === "subscription",
					true: unstable_httpSubscriptionLink({
						url: "http://localhost:3000",
						transformer: SuperJSON,
						eventSourceOptions: {
							withCredentials: true,
						},
					}),
					false: httpBatchLink({
						url: "http://localhost:3000",
						fetch(url, options) {
							return fetch(url, {
								...options,
								credentials: "include",
							});
						},
						transformer: SuperJSON,
					}),
				}),
			],
		}),
	);

	if (isPending) return null;

	if (!data) return <Navigate to="/sign-in" />;

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<SidebarProvider>
					<AppSidebar />
					<main className="p-4">
						<SidebarTrigger />
						<Outlet />
					</main>
				</SidebarProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
}
