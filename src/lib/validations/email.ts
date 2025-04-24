import { z } from "zod";
import { emailInsertSchema } from "@/server/db/schema";

export const emailInsertFormSchema = emailInsertSchema
  .pick({
    email: true,
    message: true,
    inboxId: true,
  })
  .extend({
    email: z.string().nonempty("Email is required").email(),
    message: z.string().nonempty("Message is required"),
    inboxId: z.string().min(1, "Inbox is required").transform(Number),
  });
