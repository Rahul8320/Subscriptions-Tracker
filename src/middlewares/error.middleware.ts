/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMiddleware } from "hono/factory";
import { AppError } from "../types/errors";

interface ErrorResponse {
  status: boolean;
  message: string;
  error: any;
}

export const errorMiddleware = createMiddleware(async (c, next) => {
  try {
    // If there's no error, continue to next middleware
    if (!c.error) {
      await next();
      return;
    }

    let error = c.error;
    let statusCode = error instanceof AppError ? error.statusCode : 500;

    // Handle mongoose CastError
    if (error?.name === "CastError") {
      console.error(error);
      error = new AppError("Resource not found!", 404, error.message);
      statusCode = 404;
    }

    // Handle mongoose ValidationError
    if (error?.name === "ValidationError") {
      console.error(error);
      error = new AppError("Validation error!", 400, error.message);
      statusCode = 400;
    }

    // Create the error response
    const errorResponse: ErrorResponse = {
      status: false,
      message: error?.message ?? "Internal server error",
      error: error instanceof AppError ? error.data ?? {} : error ?? {},
    };

    c.status(statusCode as any);
    return c.json(errorResponse);
  } catch (err: any) {
    console.error("Error middleware failed:", err);

    c.status(500);
    return c.json({
      status: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err : {},
    });
  }
});
