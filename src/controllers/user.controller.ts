import { Context } from "hono";
import { User } from "../models";
import { NotFoundError } from "../utils";

export class UserController {
  getAllUsers = async (c: Context) => {
    const users = await User.find().select("-password").lean();

    return c.json(
      { success: true, message: "Users fetched successfully", data: users },
      200
    );
  };

  getUser = async (c: Context) => {
    const { id } = c.req.param();

    const user = await User.findById(id).select("-password").lean();

    if (!user) {
      const error = new NotFoundError("User not found!");
      throw error;
    }

    return c.json(
      {
        success: true,
        message: "User fetched successfully",
        data: user,
      },
      200
    );
  };
}
