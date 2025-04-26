import { client } from "@/lib/rpc";

export async function getEmailById(id: string) {
  const res = await client.api.emails[":publicId"].$get({
    param: { publicId: id },
  });

  if (!res.ok) {
    throw new Error("Failed to get email");
  }

  const { data } = await res.json();

  return data;
}
