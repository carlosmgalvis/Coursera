const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const AppError = require("../util/appError");
const { promisify } = require("util");
//JWT (payload, secretOrPrivateKey, [options, callback])
const userToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    const token = userToken(newUser._id);
    res.status(201).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }
    //check if user exists
    const user = await User.findOne({ email }).select("+password");
    //(password of the login , user.password of the database return)
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Error in Login", 401));
    }
    const token = userToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  }
};

exports.protect = async (req, res, next) => {
  // 1. check if token exists in header
  // 2. check if token is valid
  // 3. check if user exists
  // 4. check if user changed password after token was issued
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log("decode", decode);

  next();
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      status: "success",
      results: allUsers.length,
      data: {
        users: allUsers,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  }
};
