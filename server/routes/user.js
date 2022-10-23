const express = require("express");
const User = require("../models/user");
const router = express.Router();
const auth = require("../middleWares/authentication");
const { register } = require("../authControllers/register");
const login = require("../authControllers/login");
const updateUser = require("../authControllers/updateUser");
const forgotPassword = require("../authControllers/forgetPassword");
const passwordUpdate = require("../authControllers/updatePassword");
const logout = require("../authControllers/logout");
const resetPassword = require("../authControllers/resetPassword");
const ErrorHandler = require("../utils/ErrorHandler");
const getExpenses = require("../expensesControllers/getExpenses");

router.post("/register", register);
router.get("/login", login);
router.post("/logout", auth, logout);
router.put("/update", auth, updateUser);
router.put("/password/update", auth, passwordUpdate);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/expenses", auth, getExpenses);
router.route("/test").post((req, res, next) => {
  const code = req.body.status;
  const message = req.body.message;
  res.status(code).send(new ErrorHandler(message, code));
});

module.exports = router;
