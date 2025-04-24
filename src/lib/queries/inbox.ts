import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetInboxes = () => {
  const query = useQuery({
    queryKey: ["inboxes"],
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
    queryKey: ["inbox-select-options"],
    queryFn: async () => {
      const res = await client.api.inboxes["select-options"].$get();

      if (!res.ok) {
        throw new Error("Failed to get inbox select options");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};
