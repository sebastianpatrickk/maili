import { routes } from "@/server";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api").route("/", routes);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;
