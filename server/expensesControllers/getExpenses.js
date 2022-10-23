const User = require("../models/user");
const Expense = require("../models/expense");
const ApiFeatures = require("../utils/apiFeatures");

module.exports = async (req, res, next) => {
  try {
    const user = req.user;
    const apiFeatures = new ApiFeatures(
      Expense.find({ user: user }),
      req.query
    ).filter();

    const expenses = await apiFeatures.query;
    const filteredExpensesCount = expenses.length;

    if (expenses.length === 0) {
      return next(
        res.status(404).json({ success: false, message: "Expense not found" })
      );
    }

    res.status(200).json({
      success: true,
      expenses,
      count: expenses.length,
      filteredExpensesCount,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
