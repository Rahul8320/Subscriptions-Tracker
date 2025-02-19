import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { aj } from "../../configs/arcjet.config";

export const arcjetMiddleware = createMiddleware(
  async (c: Context, next: Next) => {
    try {
      const decision = await aj.protect(c.req.raw, { requested: 5 });

      if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
          return c.json({ error: "Too many requests" }, 429);
        } else if (decision.reason.isBot()) {
          return c.json({ error: "No bots allowed" }, 403);
        } else {
          return c.json({ error: "Forbidden" }, 403);
        }
      }

      await next();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(`ArcJet Error: ${err.message}`);
      throw err;
    }
  }
);
