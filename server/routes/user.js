const express = require("express");
const router = express.Router();
const { register } = require("../authControllers/register");
router.post("/register", register);

module.exports = router;
