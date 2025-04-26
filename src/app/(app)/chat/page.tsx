import { ChatInput } from "@/components/chat-input";
import { getInboxSelectOptions } from "@/lib/actions/inbox";
import { getQueryClient } from "@/lib/get-query-client";
import { inboxKeys } from "@/lib/queries/inbox";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function ChatPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: inboxKeys.selectOptions,
    queryFn: getInboxSelectOptions,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatInput />
    </HydrationBoundary>
  );
}
