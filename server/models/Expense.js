const { default: mongoose } = require("mongoose");

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter expense name"],
    maxLength: [30, "Expense name cannot exceed 30 characters"],
    minLength: [3, "Expense name should be at least 5 characters long"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Please enter category"],
    maxLength: [30, "Category cannot exceed 30 characters"],
    minLength: [3, "Category should be at least 5 characters long"],
    trim: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  costPerUnit: {
    type: Number,
    required: [true, "Please enter expense cost"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please Login first"],
  },

  expesedAt: { type: Date, default: Date.now },
});

expenseSchema.method.totalExpense = () => {
  return this.costPerUnit * this.quantity;
};

module.exports = mongoose.model("Expense", expenseSchema);
