import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { PORT } from "../configs/env";
import { authRoutes, userRoutes } from "./routes";
import { connectToDB } from "./db/mongodb";
import { errorMiddleware } from "./middlewares";

const app = new Hono();

app.use(poweredBy());
app.use(logger());

app.route("/api/v1/auth", authRoutes);
app.route("/api/v1/user", userRoutes);

app.get("/", (c) => {
  return c.text("Welcome to Subscription Tracker API!", 200);
});

connectToDB();

app.onError(errorMiddleware);

export default {
  port: PORT,
  fetch: app.fetch,
};
