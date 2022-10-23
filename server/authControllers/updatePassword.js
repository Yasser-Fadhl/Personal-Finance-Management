const User = require("../models/user");

const sendToken = require("../utils/sendToken");

module.exports = passwordUpdate = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
      res.status(401).json({
        success: false,
        message: "old password is incorrect",
      });
    }

    if (!req.body.newPassword === req.body.confirmedPassword) {
      res.status(401).json({
        success: false,
        message: "Passwords does not match",
      });
    }
    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
