import { routes } from "@/server";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api").route("/", routes);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ message: "Internal Server Error" }, 500);
});

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;
