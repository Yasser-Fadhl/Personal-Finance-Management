const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "Email address is invalid";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
    minLength: [5, "Your name should be at least 5 characters long"],
    trim: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
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
  expenses: [
    {
      name: {
        type: String,
        required: [true, "Please enter expen name"],
        maxLength: [30, "Expense name cannot exceed 30 characters"],
        minLength: [5, "Expense name should be at least 5 characters long"],
      },
      category: {
        type: String,
        required: [true, "Please insert Expense category name"],
        maxLength: [30, "Expense name cannot exceed 30 characters"],
      },
      quantity: {
        type: Number,
        required: [true, "Please insert Expense quantity"],
      },
      costPerUnit: {
        type: Number,
        required: [true, "Please insert Expense cost per unit"],
      },
      expensedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  monthlyIncome: {
    type: Number,
    required: [true, "Please insert your monthly income"],
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
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("User", userSchema);
