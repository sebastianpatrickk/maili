import { isServer, QueryCache, QueryClient } from "@tanstack/react-query";
import { HTTPException } from "hono/http-exception";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (err) => {
        if (err instanceof HTTPException) {
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
