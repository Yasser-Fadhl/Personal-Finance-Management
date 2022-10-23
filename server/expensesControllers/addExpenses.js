const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const Expense = require("../models/expense");

module.exports = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const expense = await Expense.create(req.body);
    res.status(203).json({
      success: true,
      expense,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
