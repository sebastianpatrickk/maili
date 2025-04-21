import { Hono } from "hono";
import { handle } from "hono/vercel";

import emails from "@/features/emails/api/route";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app.route("/emails", emails);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
