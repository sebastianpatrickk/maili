import { Hono } from "hono";
import emailRouter from "./routers/email-router";

export const routes = new Hono().route("/emails", emailRouter);
