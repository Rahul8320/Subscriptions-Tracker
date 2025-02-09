import { describe, expect, it } from "bun:test";
import app from "../src/";

describe("GET /", () => {
  it("Should return 200 Response", async () => {
    const req = new Request("http://localhost/");
    const res = await app.fetch(req);
    expect(res.status).toBe(200);
  });

  it("Should return text Response", async () => {
    const req = new Request("http://localhost/");
    const res = await app.fetch(req);
    expect(await res.text()).toBe("Welcome to Subcription Tracker API!");
  });
});
