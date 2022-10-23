const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const Expense = require("../models/expense");
const ErrorHandler = require("../utils/errorHandler");

module.exports = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return next(
        res.status(404).json({ success: false, message: "Expense not found" })
      );
    }
    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
