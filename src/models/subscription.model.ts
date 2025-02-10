import { model, Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required!"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required!"],
      min: [0, "Price must be greater than 0!"],
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR", "GBP"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: [
        "technology",
        "entertainment",
        "lifestyle",
        "finance",
        "news",
        "sports",
        "other",
      ],
      required: [true, "Subscription category is required!"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required!"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "canalled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required!"],
      validate: {
        validator: (value: Date) => value <= new Date(),
        message: "Start date must be in the past!",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value: Date): boolean {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date!",
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto calculate renewal date if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setMonth(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Auto update the status if renewal date is passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = model("Subscription", subscriptionSchema);

export default Subscription;
