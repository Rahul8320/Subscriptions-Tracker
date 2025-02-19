import { Hono } from "hono";
import { UserController } from "../controllers";

const user = new Hono();

const userController = new UserController();

user.get("/", userController.getAllUsers);
user.get("/:id", userController.getUser);

export default user;
