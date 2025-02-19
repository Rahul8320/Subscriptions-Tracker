declare module "bun" {
  interface Env {
    PORT: number;
    DB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    ARCJET_KEY: string;
    ARCJET_ENV: string;
  }
}
