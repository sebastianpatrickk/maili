import db from "@/lib/db";
import { emails } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  const data = await db.select().from(emails).orderBy(desc(emails.createdAt));
  return c.json({ data });
});

export default app;
