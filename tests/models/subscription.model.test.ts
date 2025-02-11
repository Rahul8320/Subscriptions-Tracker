/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, it } from "bun:test";
import { assert } from "chai";
import { Subscription, User } from "../../src/models";

describe("Subscription Model Validation In-Memory", () => {
  let user: any = null;

  beforeEach(() => {
    user = new User({
      name: "John Doe",
      email: "2yKcI@example.com",
      password: "password123",
    });
  });

  describe("Name field validation", () => {
    it("should fail validation if name is not present", async () => {
      const subscription = new Subscription({
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.name);
        assert.equal(err.errors.name.message, "Subscription name is required!");
      }
    });

    it("should fail validation if name is empty", async () => {
      const subscription = new Subscription({
        name: "",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.name);
        assert.equal(err.errors.name.message, "Subscription name is required!");
      }
    });

    it("should fail validation if name is less than 2 characters", async () => {
      const subscription = new Subscription({
        name: "A",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.name);
      }
    });

    it("should fail validation if name is more than 100 characters", async () => {
      const subscription = new Subscription({
        name: "A subscription name must be less than 100 characters long, if it exceeds it will be gives an error! Lets test this using bun test and chai assert.",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.name);
      }
    });
  });

  describe("Price field validation", () => {
    it("should fail validation if price is not present", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.price);
        assert.equal(
          err.errors.price.message,
          "Subscription price is required!"
        );
      }
    });

    it("should fail validation if price is less than 0", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: -10,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.price);
        assert.equal(err.errors.price.message, "Price must be greater than 0!");
      }
    });
  });

  describe("Currency field validation", () => {
    it("should set default currency INR if currency is not present", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.equal(subscription.currency, "INR");
      } catch (err: any) {
        console.error(err.message);
        assert.fail("Validation should pass");
      }
    });
  });

  describe("Frequency field validation", () => {
    it("should set default frequency monthly if frequency is not present", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.equal(subscription.frequency, "monthly");
      } catch (err: any) {
        console.error(err.message);
        assert.fail("Validation should pass");
      }
    });
  });

  describe("Category field validation", () => {
    it("should fail validation if category is not present", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.category);
        assert.equal(
          err.errors.category.message,
          "Subscription category is required!"
        );
      }
    });

    it("should fail validation if category is empty", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.category);
        assert.equal(
          err.errors.category.message,
          "Subscription category is required!"
        );
      }
    });

    it("should pass validation if category is valid", async () => {
      const category = "technology";

      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: category,
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.equal(subscription.category, category);
      } catch (err: any) {
        console.error(err);
        assert.fail("Validation should pass");
      }
    });
  });

  describe("Payment method field validation", () => {
    it("should fail validation if payment method is not present", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.paymentMethod);
        assert.equal(
          err.errors.paymentMethod.message,
          "Payment method is required!"
        );
      }
    });

    it("should fail validation if payment method is empty", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        category: "technology",
        paymentMethod: "",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.paymentMethod);
        assert.equal(
          err.errors.paymentMethod.message,
          "Payment method is required!"
        );
      }
    });

    it("should pass validation if payment method is valid", async () => {
      const paymentMethod = "card";

      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        category: "technology",
        paymentMethod: paymentMethod,
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.equal(subscription.paymentMethod, paymentMethod);
      } catch (err: any) {
        console.error(err);
        assert.fail("Validation should pass");
      }
    });
  });

  describe("Status field validation", () => {
    it("should set default status active if status is not present", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.equal(subscription.status, "active");
      } catch (err: any) {
        console.error(err.message);
        assert.fail("Validation should pass");
      }
    });
  });

  describe("Start date field validation", () => {
    it("should fail validation if start date is not present", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.startDate);
        assert.equal(err.errors.startDate.message, "Start date is required!");
      }
    });

    it("should fail validation if start date is empty", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: "",
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.startDate);
        assert.equal(err.errors.startDate.message, "Start date is required!");
      }
    });

    it("should fail validation if start date is not date type", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: "not a date",
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.startDate);
      }
    });

    it("should fail validation if start date is not in the past", async () => {
      const today = new Date();

      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(today.setDate(today.getDate() + 1)),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.startDate);
        assert.equal(
          err.errors.startDate.message,
          "Start date must be in the past!"
        );
      }
    });

    it("should pass validation if start date is valid", async () => {
      const today = new Date();

      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: today,
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.equal(subscription.startDate, today);
      } catch (err: any) {
        console.error(err);
        assert.fail("Validation should pass");
      }
    });
  });

  describe("Renewal date field validation", () => {
    it("should fail validation if renewalDate is before startDate", async () => {
      const today = new Date();

      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: today,
        renewalDate: new Date(today.setDate(today.getDate() - 1)),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.renewalDate);
        assert.equal(
          err.errors.renewalDate.message,
          "Renewal date must be after start date!"
        );
      }
    });

    // it("should pass validation if renewalDate is after startDate", async () => {
    //   const today = new Date();
    //   const tomorrow = new Date(today.setDate(today.getDate() + 1));

    //   const subscription = new Subscription({
    //     name: "Subscription Name",
    //     price: 100,
    //     paymentMethod: "card",
    //     category: "technology",
    //     startDate: today,
    //     renewalDate: tomorrow,
    //     user: user._id,
    //   });

    //   try {
    //     await subscription.validate();
    //     assert.equal(subscription.renewalDate, tomorrow);
    //   } catch (err: any) {
    //     console.error(err);
    //     assert.fail("Validation should pass");
    //   }
    // });
  });

  describe("User field validation", () => {
    it("should fail validation if user is not present", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.user);
      }
    });

    it("should fail validation if user is empty", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: "",
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.user);
      }
    });

    it("should fail validation if user is not an object id", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: "user123",
      });

      try {
        await subscription.validate();
        assert.fail("Validation should not pass");
      } catch (err: any) {
        assert.exists(err.errors.user);
      }
    });

    it("should pass validation if user is a valid object id", async () => {
      const subscription = new Subscription({
        name: "Subscription Name",
        price: 100,
        paymentMethod: "card",
        category: "technology",
        startDate: new Date(),
        user: user._id,
      });

      try {
        await subscription.validate();
        assert.equal(subscription.user, user._id);
      } catch (err: any) {
        console.error(err);
        assert.fail("Validation should pass");
      }
    });
  });
});
