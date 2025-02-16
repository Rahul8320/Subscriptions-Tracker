const PORT = Bun.env.PORT || 3000;
const DB_URI = Bun.env.DB_URI || "";
const JWT_SECRET = Bun.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = Bun.env.JWT_EXPIRES_IN || "1D";

export { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN };
