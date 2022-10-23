const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const User = require("../models/user");
const sendToken = require("../utils/sendToken");
module.exports = login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "Please enter email or Password" })
      );
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return next(
        res
          .status(404)
          .json({ success: false, message: "invalid email or password" })
      );
    }
    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "invalid email or password1" })
      );
    }
    sendToken(user, 200, res);
  } catch (ex) {
    (ex) => console.log(ex.message);
  }
};
