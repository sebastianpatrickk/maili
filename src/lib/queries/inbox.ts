import { useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { getInboxSelectOptions } from "../actions/inbox";

export const inboxKeys = {
  all: ["inboxes"] as const,
  selectOptions: ["inbox-select-options"] as const,
};

export const prefetchInboxes = async (
  queryClient: ReturnType<typeof useQueryClient>
) => {
  await queryClient.prefetchQuery({
    queryKey: inboxKeys.all,
    queryFn: async () => {
      const res = await client.api.inboxes.$get();
      if (!res.ok) throw new Error("Failed to get inboxes");
      const { data } = await res.json();
      return data;
    },
  });
};

export const useGetInboxes = () => {
  const query = useQuery({
    queryKey: inboxKeys.all,
    queryFn: async () => {
      const res = await client.api.inboxes.$get();

      if (!res.ok) {
        throw new Error("Failed to get inboxes");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};

export const useGetInboxSelectOptions = () => {
  const query = useQuery({
    queryKey: inboxKeys.selectOptions,
    queryFn: getInboxSelectOptions,
  });

  return query;
};
