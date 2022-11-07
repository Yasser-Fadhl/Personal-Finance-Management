const Income = require("../models/Income");

module.exports = async (req, res, next) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return next(
        res.status(404).json({ success: false, message: "income not found" })
      );
    }
    res.status(200).json({
      success: true,
      message: "income has been removed successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
