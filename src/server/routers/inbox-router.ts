import { Hono } from "hono";
import db from "@/server/db";
import { desc } from "drizzle-orm";
import { inboxes } from "@/server/db/schema";

const router = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select()
      .from(inboxes)
      .orderBy(desc(inboxes.createdAt));
    return c.json({ data });
  })
  .get("/select-options", async (c) => {
    const data = await db
      .select({
        value: inboxes.id,
        label: inboxes.email,
      })
      .from(inboxes)
      .orderBy(desc(inboxes.createdAt));
    return c.json({ data });
  });

export default router;
