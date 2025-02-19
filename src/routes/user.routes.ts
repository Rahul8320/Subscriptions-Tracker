import { Hono } from "hono";
import { UserController } from "../controllers";
import { authorize } from "../middlewares";

const user = new Hono();

const userController = new UserController();

user.get("/", authorize, userController.getAllUsers);
user.get("/:id", authorize, userController.getUser);

export default user;
