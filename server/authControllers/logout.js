const express = require("express");
module.exports = logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      htttOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "You are logout successfully",
    });
  } catch (error) {
    return next(
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );
  }
};
