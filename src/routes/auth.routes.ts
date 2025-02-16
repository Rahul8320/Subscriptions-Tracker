import { Hono } from "hono";
import { AuthController } from "../controllers";

const auth = new Hono();

const authController = new AuthController();

auth.post("/sign-up", authController.signUp);

auth.post("/sign-in", authController.signIn);

auth.post("/sign-out", authController.signOut);

auth.post("/verify", authController.verify);

export default auth;
