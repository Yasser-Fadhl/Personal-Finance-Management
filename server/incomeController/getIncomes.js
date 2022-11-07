const User = require("../models/user");
const Income = require("../models/Income");
const ApiFeatures = require("../utils/apiFeatures");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  const _id = await User.findById(decoded.id).select("id");

  try {
    const apiFeatures = new ApiFeatures(
      Income.findOne({ user: _id }),
      req.query
    ).filter();

    const income = await apiFeatures.query;
    const filteredIncomeCount = income.length;

    res.status(200).json({
      success: true,
      income,
      count: income.length,
      filteredIncomeCount,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
