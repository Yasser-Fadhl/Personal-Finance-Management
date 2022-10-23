const User = require("../models/user");

const sendEmail = require("../utils/sendEmail");
module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/user/password/reset/${resetToken}`;
    const message = `Your password reset token is \n ${resetUrl}`;
    try {
      await sendEmail({
        email: user.email,
        subject: "Password Recovery Email",
        message: message,
      });
      res.status(200).json({
        success: true,
        message: `email has been send successfully to ${user.email}`,
      });
    } catch (ex) {
      user.resetPasswordToke = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(400).json({ success: false, message: ex.message });
    }
  } catch (error) {
    res.json({
      success: true,
      message: error.message,
    });
  }
};
