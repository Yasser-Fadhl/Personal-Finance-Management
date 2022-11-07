const Expense = require("../models/expense");

module.exports = async (req, res) => {
  try {
    const expense = await Expense.create({
      name: req.body.name,
      category: req.body.category,
      amount: req.body.amount,
      user: req.user.id,
      expensesAt: req.body.expensesAt,
    });
    res.status(203).json({
      success: true,
      expense,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
