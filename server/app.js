const express = require("express");
const expenses = require("./routes/expenses");
const income = require("./routes/income");
const cloudinary = require("cloudinary");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./routes/user");
const cors = require("cors");
const errorsMidleware = require("./middleWares/errorsMidleware");
const app = express();
const fileUpload = require("express-fileupload");
require("dotenv").config({ path: "config/config.env" });
cloudinary.config({
  cloud_name: "dwgsn8tru",
  api_key: "788296679325818",
  api_secret: "_g2xSBYsNrLHh1gGXbS9H5QAnXs",
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
//app.use(bodyParser.json({ type: "application/*+json" }));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorsMidleware);
app.use(router);
app.use("/api/v1/user", user);
app.use("/api/v1/expenses", expenses);
app.use("/api/v1/income", income);
module.exports = app;
