import { client } from "@/lib/rpc";

export async function getInboxSelectOptions() {
  const res = await client.api.inboxes["select-options"].$get();

  if (!res.ok) {
    throw new Error("Failed to get inbox select options");
  }

  const { data } = await res.json();

  return data;
}
