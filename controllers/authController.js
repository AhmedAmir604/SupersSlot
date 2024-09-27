import User from "../models/userModel.js";
import { catchAsync } from "./errorController.js";
import ErrorHandler from "../utils/appError.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { authService } from "../services/authService.js";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 600000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  user.password = undefined;
  user.active = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

//Work as a middlewares for protected routes
export const protect = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    const decode = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    const user = await User.findById(decode.id);
    //Here, the iat is the time when token was issue(generated) in unix timestamp
    if (user.isPasswordChanged(decode.iat)) {
      return next(
        new ErrorHandler("Password updated please login again!", 401)
      );
    }
    req.user = user;
    res.status(200).json({
      status: "success",
      user,
    });
  } else {
    return next(
      new ErrorHandler(
        "Please login you are not allowed to access this :(",
        400
      )
    );
  }
});

export const isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    const decode = await authService.verifyToken(req.cookies.jwt);
    const user = await authService.findById(decode.id);

    if (!user || authService.isPasswordChanged(user, decode.iat)) {
      res.status(200).json({
        status: "success NO",
      });
    } else {
      req.user = user;
      res.status(200).json({
        status: "success",
        user,
      });
    }
  } else {
    res.status(200).json({
      status: "success",
    });
  }
});

export const signUp = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const doc = await authService.createUser({
    name,
    email,
    password,
    confirmPassword,
  });
  res.status(201).json({
    status: "success",
    data: doc,
  });
};

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.findOne({ email: email }, "password");
  console.log(user);
  if (!user) {
    return next(new ErrorHandler("Cannot find User with this email!", 404));
  }
  if (!(await authService.verifyPassword(password, user.password))) {
    return next(new ErrorHandler("Please provide valid credentials!", 500));
  }
  req.user = user;
  createSendToken(user, 200, req, res);
});

export const logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "LoggedOut", {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  res.status(200).json({
    status: "success",
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await authService.findOne({ email: req.body.email });

  const token = await authService.generatePasswordResetToken(user);
  // await user.save({ validateBeforeSave: false });
  const url = `${req.protocol}://${
    process.env.NODE_ENV === "development" ? "localhost:5173" : req.get("host")
  }/users/reset-password/${token}`;

  res.status(200).json({
    status: "success",
    token: token,
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const token = authService.hashToken(req.params.id);
  const user = await authService.findByToken(token);
  if (!user) {
    next(new ErrorHandler("Token Invalid or Expired try again later!", 500));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match!", 400));
  }
  // If passwords match, reset the password
  if (!(await authService.resetPassword(user, req.body.password))) {
    return next(
      new ErrorHandler("We got into some trouble, please try again later!", 400)
    );
  }
  res.status(202).json({
    status: "success",
  });
});
