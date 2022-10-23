const User = require("../models/user");
const sendToken = require("../utils/sendToken");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, monthlyIncome, image, expenses } = req.body;
    if (!name || !email || !password) {
      return next(
        res
          .status(400)
          .json({
            success: false,
            message: "Please enter valid name, email and password",
          })
      );
    }

    const isUser = await User.findOne({ email: req.body.email });
    if (isUser) {
      return next(
        res
          .status(400)
          .json({ success: false, message: "This email is already exists" })
      );
    }
    const user = await User.create({
      name,
      email,
      password,
      monthlyIncome,
      image,
      /*   image: {
          public_id: result.public_id,
          url: result.secure_url,
        },*/
      expenses,
    });

    sendToken(user, 200, res);
  } catch {
    (ex) => console.log(ex.message);
  }
  /*const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "User images",
        width: 150,
        scale: "crop",
      });*/
};
