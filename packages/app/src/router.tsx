import { Spinner } from "@/components/spinner";
import { queryClient, trpc, trpcClient, trpcQueryUtils } from "@/lib/trpc";
import { routeTree } from "@/routeTree.gen";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: {
      trpcQueryUtils,
    } as {
      trpcQueryUtils: typeof trpcQueryUtils;
    },
    defaultPreload: "render",
    defaultPendingComponent: () => (
      <div className={`p-2 text-2xl`}>
        <Spinner />
      </div>
    ),
    Wrap: function WrapComponent({ children }) {
      return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      );
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
