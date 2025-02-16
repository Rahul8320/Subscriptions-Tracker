import { afterAll, describe, expect, it } from "bun:test";
import app from "../../src";
import { User } from "../../src/models";

describe("Auth Controller", () => {
  const basePath = "http://localhost/api/v1/auth";
  const userEmail = "test@example.com";

  describe("Sign Up", () => {
    it("should return an error for missing name field", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: "password123",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe("Required");
      expect(error.issues[0].path[0]).toBe("name");
    });

    it("should return an error for empty name", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "",
          email: userEmail,
          password: "password123",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe(
        "Name must be at least 2 characters"
      );
      expect(error.issues[0].path[0]).toBe("name");
    });

    it("should return an error for name less than 2 characters", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "A",
          email: userEmail,
          password: "password123",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe(
        "Name must be at least 2 characters"
      );
      expect(error.issues[0].path[0]).toBe("name");
    });

    it("should return an error for name more than 50 characters", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "this can't be an normal user name, it's small very very bad with this strong flavour",
          email: userEmail,
          password: "password123",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe(
        "Name can not be more than 50 characters"
      );
      expect(error.issues[0].path[0]).toBe("name");
    });

    it("should return an error for missing email field", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test user",
          password: "password123",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe("Required");
      expect(error.issues[0].path[0]).toBe("email");
    });

    it("should return an error for empty email", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test user",
          email: "",
          password: "password123",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe("Invalid email format");
      expect(error.issues[0].path[0]).toBe("email");
    });

    it("should return an error for invalid email address", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test user",
          email: "invalid_email",
          password: "password123",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe("Invalid email format");
      expect(error.issues[0].path[0]).toBe("email");
    });

    it("should return an error for missing password field", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test user",
          email: userEmail,
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe("Required");
      expect(error.issues[0].path[0]).toBe("password");
    });

    it("should return an error for empty password", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test user",
          email: userEmail,
          password: "",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe(
        "Password must be at least 6 characters"
      );
      expect(error.issues[0].path[0]).toBe("password");
    });

    it("should return an error for password less than 6 characters", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test user",
          email: userEmail,
          password: "1234",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe(
        "Password must be at least 6 characters"
      );
      expect(error.issues[0].path[0]).toBe("password");
    });

    it("should return an error for extra field in request", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test user",
          email: userEmail,
          password: "password123",
          extra_field: "extra field",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe(
        "Unrecognized key(s) in object: 'extra_field'"
      );
      expect(error.issues[0].keys[0]).toBe("extra_field");
    });

    it("should create a new user for valid input", async () => {
      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test User",
          email: userEmail,
          password: "password123",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(201);
      const { success, message, data } = await response.json();
      expect(success).toBe(true);
      expect(message).toBe("User created successfully");
      expect(data.token).toBeDefined();
      expect(data.user).toBeDefined();
      expect(data.user.name).toBe("Test User");
      expect(data.user.email).toBe(userEmail);
    });
  });

  afterAll(async () => {
    await User.deleteOne({ email: userEmail }).exec();
  });
});
