const Income = require("../models/Income");
module.exports = async (req, res, next) => {
  req.body.user = req.user.id;
  try {
    const income = await Income.create(req.body);
    res.status(200).json({ success: true, income });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
