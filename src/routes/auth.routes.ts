import { Hono } from "hono";

const auth = new Hono();

auth.post("/sign-up", (c) => c.text("Sign-Up", 200));

auth.post("/sign-in", (c) => c.text("Sign-In", 200));

auth.post("/sign-out", (c) => c.text("Sign-Out", 200));

auth.post("/verify", (c) => c.text("Verify", 200));

export default auth;
