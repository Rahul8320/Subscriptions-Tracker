/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from "hono";
import { HandlerResponse } from "hono/types";
import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "../models";
import { AppError } from "../utils";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../../configs/env";

export class AuthController {
  signUp = async (c: Context) => {
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    try {
      const { name, email, password } = await c.req.json();

      // check if user is already exists or not
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        const error = new AppError("User already exists", 409);
        throw error;
      }

      // hashed password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUsers = await User.create(
        [
          {
            name,
            email,
            password: hashedPassword,
          },
        ],
        { session: mongoSession }
      );

      const token = jwt.sign(
        { userId: newUsers[0]._id },
        JWT_SECRET as jwt.Secret,
        {
          expiresIn: JWT_EXPIRES_IN,
        } as jwt.SignOptions
      );

      await mongoSession.commitTransaction();
      mongoSession.endSession();

      return c.json(
        {
          success: true,
          message: "User created successfully",
          data: {
            token,
            user: newUsers[0],
          },
        },
        201
      );
    } catch (err: any) {
      await mongoSession.abortTransaction();
      mongoSession.endSession();
      throw err;
    }
  };

  signIn = (c: Context): HandlerResponse<any> => {
    return c.text("Sign-In", 200);
  };

  signOut = (c: Context): HandlerResponse<any> => {
    return c.text("Sign-Out", 200);
  };

  verify = (c: Context): HandlerResponse<any> => {
    return c.text("Verify", 200);
  };
}
