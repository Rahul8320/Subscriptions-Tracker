import { Hono } from "hono";
import { AuthController } from "../controllers";
import { zValidator } from "@hono/zod-validator";
import { signinSchema, signupSchema } from "../schemas";

const auth = new Hono();

const authController = new AuthController();

auth.post("/sign-up", zValidator("json", signupSchema), authController.signUp);

auth.post("/sign-in", zValidator("json", signinSchema), authController.signIn);

auth.post("/sign-out", authController.signOut);

auth.post("/verify", authController.verify);

export default auth;
