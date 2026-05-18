const bcrypt = require("bcrypt");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { signUpSchema, loginSchema } = require("../validations/authSchema");

const signUp = async (req, res, next) => {
  try {
    const { error, value } = signUpSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const message = error.details.map((err) => err.message).join(", ");
      return next(new CustomError(message, 400));
    }
    const user = await User.create(value);
    res.status(201).json({
      success: true,
      message: "Account created successfully, Please login.",
    });
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const message = error.details.map((err) => err.message).join(", ");
      return next(new CustomError(message, 400));
    }
    const { username, password } = value;
    console.log(username, password);
    const user = await User.findOne({ username });
    if (!user) {
      return next(new CustomError("Invalid username or password.", 401));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new CustomError("Invalid username or password.", 401));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      success: true,
      data: user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
const getMe = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findById(id).select("-password -__v");
    if (!user) {
      return next("User not found.", 404);
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  login,
  getMe,
};
