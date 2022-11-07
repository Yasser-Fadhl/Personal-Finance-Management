const User = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const _id = await User.findById(decoded.id).select("id");
    const user = await User.findById(decoded.id);
    res.status(200).json({
      success: true,
      user,
      _id,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: true, message: error.message });
  }
};
