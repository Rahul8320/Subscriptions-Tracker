declare module "bun" {
  interface Env {
    PORT: number;
    DB_URI: string;
  }
}
