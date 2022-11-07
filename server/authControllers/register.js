const User = require("../models/user");
const sendToken = require("../utils/sendToken");
const cloudinary = require("cloudinary");
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please enter valid name, email and password",
      });
    }

    const isUser = await User.findOne({ email: req.body.email });
    if (isUser) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "This email is already exists" })
      );
    }
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "Avatars",
      width: 150,
      scale: "crop",
    });

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
  } catch (ex) {
    console.error(ex);
    res.status(400).json({ success: false, message: ex.message });
  }
};
