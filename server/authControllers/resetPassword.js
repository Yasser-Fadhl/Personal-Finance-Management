const User = require("../models/user");
const sendToken = require("../utils/sendToken");
const crypto = require("crypto");
module.exports = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        res.status(400).json({
          success: false,
          message: "Reset token is expired",
        })
      );
    }
    if (req.body.newPassword !== req.body.confirmedPassword)
      return next(
        res.status(400).json({
          success: false,
          message: "Passwords do not match",
        })
      );
    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    sendToken(user, 200, res);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: true, message: error.message });
  }
};
