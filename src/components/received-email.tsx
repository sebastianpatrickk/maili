"use client";

import { useGetEmailById } from "@/lib/queries/email";
import { useParams } from "next/navigation";

export default function ReceivedEmail() {
  const params = useParams<{ id: string }>();

  const { data, isLoading } = useGetEmailById(params.id);
  return <p>{data?.message}</p>;
}
