import ReceivedEmail from "@/components/received-email";
import { getEmailById } from "@/lib/actions/email";
import { getQueryClient } from "@/lib/get-query-client";
import { emailKeys } from "@/lib/queries/email";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: emailKeys.byId(id),
    queryFn: () => getEmailById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <ReceivedEmail />
      </div>
    </HydrationBoundary>
  );
}
