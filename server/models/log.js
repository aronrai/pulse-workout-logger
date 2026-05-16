const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    exercise: {
      type: String,
      trim: true,
      required: [true, "What exercise did you perform?"],
      minlength: [3, "Exercise name is too short"],
      maxlength: [30, "Exercise name is too long"],
    },
    kg: {
      type: Number,
      required: [true, "Weight (kg) is required"],
      min: [0, "Weight cannot be negative"],
    },
    reps: {
      type: Number,
      required: [true, "Number of reps is required"],
      min: [1, "You must perform at least 1 rep"],
    },
    volume: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Log must belong to a user"],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

logSchema.pre("save", function () {
  this.volume = this.kg * this.reps;
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
