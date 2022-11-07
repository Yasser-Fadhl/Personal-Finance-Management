const { default: mongoose } = require("mongoose");

const incomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should be at least 3 characters long"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Please enter amount"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please Login first"],
  },

  earnedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Income", incomeSchema);
