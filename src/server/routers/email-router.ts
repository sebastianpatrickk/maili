import { Hono } from "hono";
import db from "@/server/db";
import { desc } from "drizzle-orm";
import { emails } from "../db/schema";

const router = new Hono().get("/", async (c) => {
  const data = await db.select().from(emails).orderBy(desc(emails.createdAt));
  return c.json({ data });
});

export default router;
