const Expense = require("../models/expense");
module.exports = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!expense) {
      return next(
        res.status(404).json({ success: false, message: "Expense not found" })
      );
    }
    await expense.save();
    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
