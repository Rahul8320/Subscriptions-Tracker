/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { JWT_SECRET } from "../../configs/env";
import * as jwt from "jsonwebtoken";
import { User } from "../models";

export const authorize = createMiddleware(async (c: Context, next: Next) => {
  try {
    let token;

    const authorizationHeader = c.req.header("Authorization");

    if (authorizationHeader) {
      token = authorizationHeader.replace("Bearer ", "");
    }

    if (!token) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    const user = await User.findById(decoded.userId);

    if (!user) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    c.set("user", user);

    await next();
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error?.message || "Unauthorized",
      },
      401
    );
  }
});
