import { createTrpcContext, appRouter } from "@repo/api";
import { TRPC_ENDPOINT } from "@repo/tooling";
import { createFileRoute } from "@tanstack/react-router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const trpcRequestHandler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: TRPC_ENDPOINT,
    req: request,
    router: appRouter,
    createContext: () => createTrpcContext({ request }),
  });
};

export const Route = createFileRoute("/api/trpc/$trpc")({
  server: {
    handlers: {
      GET: ({ request }) => trpcRequestHandler(request),
      POST: ({ request }) => trpcRequestHandler(request),
    },
  },
});
