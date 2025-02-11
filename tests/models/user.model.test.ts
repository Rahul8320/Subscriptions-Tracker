/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it } from "bun:test";
import { assert } from "chai";
import { User } from "../../src/models";

describe("User Model Validation In-Memory", () => {
  describe("Name field validation", () => {
    it("should fail validation if name is not present", async () => {
      const user = new User({
        email: "2yKcI@example.com",
        password: "password123",
      });

      try {
        await user.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.name);
        assert.equal(err.errors.name.message, "Name is required!");
      }
    });

    it("should fail validation if name is empty", async () => {
      const user = new User({
        name: "",
        email: "2yKcI@example.com",
        password: "password123",
      });

      try {
        await user.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.name);
        assert.equal(err.errors.name.message, "Name is required!");
      }
    });

    it("should fail validation if name is less than 2 characters", async () => {
      const user = new User({
        name: "f",
        email: "2yKcI@example.com",
        password: "password123",
      });

      try {
        await user.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.name);
      }
    });

    it("should fail validation if name is more than 50 characters", async () => {
      const user = new User({
        name: "Name must not more than 50 characters long, if it exceeds it will be gives an error! Lets test this using bun test and chai assert.",
        email: "2yKcI@example.com",
        password: "password123",
      });

      try {
        await user.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.name);
      }
    });
  });

  describe("Email field validation", () => {
    it("should fail validation if email is not present", async () => {
      const user = new User({
        name: "John Doe",
        password: "password123",
      });

      try {
        await user.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.email);
        assert.equal(err.errors.email.message, "Email is required!");
      }
    });

    it("should fail validation if email is empty", async () => {
      const user = new User({
        name: "John Doe",
        email: "",
        password: "password123",
      });

      try {
        await user.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.email);
        assert.equal(err.errors.email.message, "Email is required!");
      }
    });

    it("should fail validation if email is invalid", async () => {
      const user = new User({
        name: "John Doe",
        email: "invalid_email",
        password: "password123",
      });

      try {
        await user.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.email);
        assert.equal(
          err.errors.email.message,
          "Please fill a valid email address!"
        );
      }
    });
  });

  describe("Password field validation", () => {
    it("should fail validation if password is not present", async () => {
      const user = new User({
        name: "John Doe",
        email: "2yKcI@example.com",
      });

      try {
        await user.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.password);
        assert.equal(err.errors.password.message, "Password is required!");
      }
    });

    it("should fail validation if password is empty", async () => {
      const user = new User({
        name: "John Doe",
        email: "2yKcI@example.com",
        password: "",
      });

      try {
        await user.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.password);
        assert.equal(err.errors.password.message, "Password is required!");
      }
    });

    it("should fail validation if password is less than 6 characters", async () => {
      const user = new User({
        name: "John Doe",
        email: "2yKcI@example.com",
        password: "pass",
      });

      try {
        await user.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.password);
      }
    });
  });

  it("should successfully validate an valid document", async () => {
    const user = new User({
      name: "John Doe",
      email: "2yKcI@example.com",
      password: "password123",
    });

    try {
      await user.validate();
      assert.ok(true, "Validation should pass");
    } catch (err: any) {
      console.log(err);
      assert.fail("Validation should not throw an error");
    }
  });
});
