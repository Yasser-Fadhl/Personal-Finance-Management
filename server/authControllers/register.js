const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const User = require("../models/user");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/sendToken");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "User images",
    width: 150,
    scale: "crop",
  });
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      new ErrorHandler("Please enter valid name, email and password", 400)
    );
  }

  const isUser = await User.findOne({ email: req.body.email });
  if (isUser) {
    return next(new ErrorHandler("This email is already exists", 400));
  }
  const user = await User.create({
    name,
    email,
    password,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
  sendToken(user, 200, res);
});
