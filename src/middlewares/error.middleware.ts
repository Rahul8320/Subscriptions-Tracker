/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMiddleware } from "hono/factory";
import { AppError, ValidationError } from "../utils";
import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

export const errorMiddleware = createMiddleware(
  async (c: Context, next: Next) => {
    try {
      await next();
    } catch (err: any) {
      console.error(err);

      let errorResponse = new AppError("Internal Server Error", 500);

      // Handle custom AppError instances
      if (err instanceof AppError) {
        errorResponse = new AppError(err.message, err.statusCode, err.data);
      }

      // Handle Hono HTTP exceptions
      else if (err instanceof HTTPException) {
        errorResponse = new AppError(err.message, err.status);
      }

      // Handle MongoDB Validation Errors
      else if (err.name === "ValidationError") {
        errorResponse = new ValidationError(err.errors);
      }

      // Handle MongoDB Duplicate Key Error
      else if (err.code === 11000) {
        errorResponse = new AppError("Duplicate key error", 400, {
          field: Object.keys(err.keyPattern),
        });
      }

      // Handle MongoDB Cast Errors (e.g., invalid ObjectId)
      else if (err.name === "CastError") {
        errorResponse = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
      }

      return c.json(
        { message: errorResponse.message, data: errorResponse.data },
        errorResponse.statusCode as any
      );
    }
  }
);
