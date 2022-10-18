const express = require("express");
const cloudinary = require("cloudinary");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/user");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);
app.use(cors());
cloudinary.config({
  cloud_name: "dwgsn8tru",
  api_key: "788296679325818",
  api_secret: "_g2xSBYsNrLHh1gGXbS9H5QAnXs",
});

app.use("/api/v1/user", user);
module.exports = app;
