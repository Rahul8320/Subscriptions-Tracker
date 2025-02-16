import { afterAll, afterEach, describe, expect, it } from "bun:test";
import app from "../../src";
import { User } from "../../src/models";

describe("Auth Controller", () => {
  const basePath = "http://localhost/api/v1/auth";
  const userEmail = "test@example.com";

  describe("Failure POST /auth/sign-up", () => {
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
  });

  describe("Success POST /auth/sign-up", () => {
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

    it("should not present password in response", async () => {
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
      const { data } = await response.json();
      expect(data.token).toBeDefined();
      expect(data.user).toBeDefined();
      expect(data.user.password).toBeUndefined();
    });

    it("should not save password in plain text", async () => {
      const password = "password123";

      const req = new Request(`${basePath}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test User",
          email: userEmail,
          password: password,
        }),
      });
      const response = await app.fetch(req);

      const user = await User.findOne({ email: userEmail }).lean();

      expect(response.status).toBe(201);
      expect(user).toBeDefined();
      expect(user?.password).not.toBe(password);
    });

    it("should return an error for duplicate email", async () => {
      await User.create([
        {
          name: "Test User",
          email: userEmail,
          password: "password123",
        },
      ]);

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

      // create another user with same email
      const response = await app.fetch(req);

      expect(response.status).toBe(409);
      const { success, message, data } = await response.json();
      expect(success).toBe(false);
      expect(message).toBe("User already exists");
      expect(data.token).toBeUndefined();
      expect(data.user).toBeUndefined();
    });

    afterEach(async () => {
      await User.deleteOne({ email: userEmail }).exec();
    });
  });

  describe("Sign In", () => {
    it("should return an error for missing email field", async () => {
      const req = new Request(`${basePath}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
      const req = new Request(`${basePath}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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

    it("should return an error for invalid email", async () => {
      const req = new Request(`${basePath}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "invalid email",
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
      const req = new Request(`${basePath}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
      const req = new Request(`${basePath}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: "",
        }),
      });
      const response = await app.fetch(req);

      expect(response.status).toBe(400);
      const { success, error } = await response.json();
      expect(success).toBe(false);
      expect(error).toBeDefined();
      expect(error.issues[0].message).toBe("Password is required");
      expect(error.issues[0].path[0]).toBe("password");
    });

    it("should return an error for extra field in request", async () => {
      const req = new Request(`${basePath}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
