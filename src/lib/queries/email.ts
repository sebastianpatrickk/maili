import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

export const emailKeys = {
  all: ["emails"] as const,
};

export const useGetEmails = () => {
  const query = useQuery({
    queryKey: emailKeys.all,
    queryFn: async () => {
      const res = await client.api.emails.$get();

      if (!res.ok) {
        throw new Error("Failed to get emails");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};

type ResponseType = InferResponseType<
  (typeof client.api.emails.create)["$post"]
>;
type RequestType = InferRequestType<(typeof client.api.emails.create)["$post"]>;

export const useCreateEmail = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.emails.create["$post"]({ json });

      if (!res.ok) {
        throw new Error("Failed to create email");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Email created");
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
    onError: (err) => {
      toast.error("Failed to create email");
    },
  });
  return mutation;
};
