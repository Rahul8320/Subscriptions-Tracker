import { Hono } from "hono";
import { PORT } from "../configs/env";
import { authRoutes } from "./routes";
import { connectToDB } from "./db/mongodb";

const app = new Hono();

app.route("/api/v1/auth", authRoutes);

app.get("/", (c) => {
  return c.text("Welcome to Subscription Tracker API!", 200);
});

connectToDB();

export default {
  port: PORT,
  fetch: app.fetch,
};
