const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required to personalize your dashboard"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [30, "Name is too long (max 30 characters)"],
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "A unique username is required"],
      minlength: [3, "Username must be at least 3 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required for account security"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    // High-performance tracking stats
    currentStreak: {
      type: Number,
      default: 0,
      min: [0, "Streak cannot be a negative value"],
    },
    longestStreak: {
      type: Number,
      default: 0,
      min: [0, "Longest streak cannot be a negative value"],
    },
    maxDailyVolume: {
      type: Number,
      default: 0,
      min: [0, "Volume cannot be a negative value"],
    },
    totalLifeTimeVolume: {
      type: Number,
      default: 0,
      min: [0, "Lifetime volume cannot be a negative value"],
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
