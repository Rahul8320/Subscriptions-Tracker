/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError, ValidationError } from "../utils";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const errorMiddleware = async (err: Error | any, c: Context) => {
  console.log(err);

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
    errorResponse = new ValidationError("Validation failed", err.errors);
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
    {
      success: false,
      message: errorResponse.message,
      error: errorResponse.data,
    },
    errorResponse.statusCode as any
  );
};
