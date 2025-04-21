import { z } from "zod";

export const createEmailSchema = z.object({
  email: z.string().nonempty("Email is required").email(),
  message: z.string().nonempty("Message is required"),
  inbox: z.string().nonempty("Inbox is required"),
});
