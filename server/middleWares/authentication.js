const jwt = require("jsonwebtoken");
const user = require("../models/user");
module.exports = auth = async (req, res, next) => {
  require("dotenv").config({ path: "server/config/config.env" });
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first to access the resources",
      });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      req.user = await user.findById(decoded.id).select("id");

      next();
    }
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
