const User = require("../models/User");
const AppError = require("../utils/error-handling/AppError");
const catchAsync = require("../utils/error-handling/catchAsync");
const signToken = require("../utils/jwt-auth/signToken");
const verifyPassword = require("../utils/verifyPassword");

const create = catchAsync(async (req, res, next) => {
  const { name, email, password, phone, role } = req.body;
  if (role === "super_admin") {
    next(new AppError("You are not allowed to set role to superadmin"));
  }
  const newUser = await User.create(req.body);
  const token = await signToken(newUser._id, newUser.role);
  res.status(200).json({
    status: "Success",
    data: {
      newUser,
    },
    token,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Cannot leave email id or password field blank"));
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("User not found"));
  }
  const verify = await verifyPassword(password, user.password);
  if (!verify) {
    return next(new AppError("Enter the correct password"));
  }
  const token = await signToken(user._id, user.role);

  res.status(201).json({
    status: "SUCCESS",
    message: "Login successful",
    data: {
      user,
      token,
    },
  });
});

module.exports = { create, login };
