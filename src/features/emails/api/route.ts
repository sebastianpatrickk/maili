import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  return c.json({ data: "emails" });
});

export default app;
