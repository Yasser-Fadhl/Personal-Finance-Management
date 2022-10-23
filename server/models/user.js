const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
    minLength: [5, "Your name should be at least 5 characters long"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter valid email address"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
    trim: true,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase();
  next();
});
userSchema.methods.comparePassword = async function (insertedPassword) {
  return await bcrypt.compare(insertedPassword, this.password);
};
userSchema.methods.assignJwt = async function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "5h",
  });
};
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
