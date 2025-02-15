/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMiddleware } from "hono/factory";

export const errorMiddleware = createMiddleware(async (c, next) => {
  try {
    let error = c.error;
    let statusCode: number = 500;

    if (error === undefined || error === null) {
      await next();
    }

    // Mongoose bad ObjectId error
    if (error?.name === "CastError") {
      const message = "Resource not found!";

      error = new Error(message);
      statusCode = 404;
    }

    return c.json(
      {
        status: false,
        message: c.error?.message ?? "Internal server error",
        error: c.error ?? {},
      },
      statusCode
    );
  } catch (err: any) {
    console.error(err);
    return c.json(
      {
        status: false,
        message: c.error?.message ?? err.message,
        error: c.error ?? err,
      },
      500
    );
  }
});
