const Expense = require("../models/expense");

module.exports = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return next(
        res.status(404).json({ success: false, message: "Expense not found" })
      );
    }
    res.status(200).json({
      success: true,
      message: "Expense has been removed successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
