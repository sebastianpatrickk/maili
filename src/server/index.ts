import { Hono } from "hono";
import emailRouter from "./routers/email-router";
import inboxRouter from "./routers/inbox-router";

export const routes = new Hono()
  .route("/emails", emailRouter)
  .route("/inboxes", inboxRouter);
