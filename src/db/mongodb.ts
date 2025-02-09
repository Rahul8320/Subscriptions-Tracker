import mongoose from "mongoose";
import { DB_URI } from "../../configs/env";

if (!DB_URI) {
  throw new Error(
    "Please define the DB_URI environment variable inside .env file!"
  );
}

export const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log("Connected to mongodb!");
  } catch (err) {
    console.error("Error connecting to mongodb: ", err);
    process.exit(1);
  }
};
