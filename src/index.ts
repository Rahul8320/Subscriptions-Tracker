import { Hono } from "hono";
import { PORT } from "../configs/env";
import { authRoutes } from "./routes";

const app = new Hono();

app.route("/api/v1/auth", authRoutes);

app.get("/", (c) => {
  return c.text("Welcome to Subcription Tracker API!", 200);
});

export default {
  port: PORT,
  fetch: app.fetch,
};
