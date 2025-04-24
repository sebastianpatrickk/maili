import { emailInsertSchema } from "@/lib/schema";
import { z } from "zod";

export const emailInsertFormSchema = emailInsertSchema
  .pick({
    email: true,
    message: true,
    inboxId: true,
  })
  .extend({
    email: z.string().nonempty("Email is required").email(),
    message: z.string().nonempty("Message is required"),
    inboxId: z
      .string()
      .transform((val) => Number(val))
      .pipe(z.number().int().min(1, "Inbox is required")),
  });
