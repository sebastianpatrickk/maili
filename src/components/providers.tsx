"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { HTTPException } from "hono/http-exception";
import { PropsWithChildren, useState, useEffect } from "react";
import { prefetchInboxes } from "@/lib/queries/inbox";

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof HTTPException) {
            }
          },
        }),
      })
  );

  useEffect(() => {
    prefetchInboxes(queryClient);
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
