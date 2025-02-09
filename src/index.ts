import { Hono } from "hono";
import { PORT } from "../configs/env";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Welcome to Subcription Tracker API!", 200);
});

export default {
  port: PORT,
  fetch: app.fetch,
};
