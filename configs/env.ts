const PORT = Bun.env.PORT || 3000;
const DB_URI = Bun.env.DB_URI || "";
const JWT_SECRET = Bun.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = Bun.env.JWT_EXPIRES_IN || "1D";
const ARCJET_ENV = Bun.env.ARCJET_ENV || "development";
const ARCJET_KEY = Bun.env.ARCJET_KEY || "";

export { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_ENV, ARCJET_KEY };
