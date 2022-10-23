const jwt = require("jsonwebtoken");
const user = require("../models/user");
module.exports = auth = async (req, res, next) => {
  require("dotenv").config({ path: "server/config/config.env" });
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first to access the resources",
      });
    } else {
      const decoded = await jwt.verify(token, "BWNJN8328YH3NNUIB29LDMLAMKM382");
      console.log(decoded);
      req.user = await user.findById(decoded.id);
    }
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
  next();
};
