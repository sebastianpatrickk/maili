import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetEmails = () => {
  const query = useQuery({
    queryKey: ["emails"],
    queryFn: async () => {
      const res = await client.api.emails.$get();

      if (!res.ok) {
        throw new Error("Failed to get workspaces");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};
