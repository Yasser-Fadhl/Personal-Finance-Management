const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const User = require("../models/user");
const resetPassword = require("./resetPassword");

module.exports = updateUser = async (req, res, next) => {
  try {
    const newData = {
      email: req.body.email,
      expenses: req.body.expenses,
      name: req.body.name,
      monthlyIncome: req.body.monthlyIncome,
    };
    const user = await User.findByIdAndUpdate(req.user._id, newData);
    if (!user) {
      return next(
        res
          .status(404)
          .json({ success: false, message: "invalid email or password" })
      );
    }
    await user.save().then(
      res.status(200).json({
        success: true,
        message: "user has been updated successfully",
        user,
      })
    );
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: true, message: error.message });
  }
};
