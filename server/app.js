const express = require("express");
const expenses = require("./routes/expenses");
const cloudinary = require("cloudinary");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./routes/user");
const errorsMidleware = require("./middleWares/errorsMidleware");
const app = express();
require("dotenv").config({ path: "config/config.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(cookieParser());
//app.use(errorsMidleware);
app.use(router);
app.use("/api/v1/user", user);
app.use("/api/v1/expenses", expenses);

module.exports = app;
