import { catchAsync } from "./errorController.js";
import ErrorHandler from "../utils/appError.js";
import jwt from "jsonwebtoken";
import { authService } from "../services/authService.js";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  user.password = undefined;
  user.active = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
  });
};

export const signUp = catchAsync(async (req, res, next) => {
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
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.findUserByEmail(email);

  if (!user) {
    return next(new ErrorHandler("Cannot find User with this email!", 404));
  }

  if (!(await authService.verifyPassword(password, user.password))) {
    return next(new ErrorHandler("Please provide valid credentials!", 500));
  }

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
  const user = await authService.findUserByEmail(req.body.email);
  if (!user) {
    return next(new ErrorHandler("No user found with this email!", 404));
  }

  const token = await authService.generatePasswordResetToken(user);
  const url = `${req.protocol}://${req.get(
    "host"
  )}/users/reset-password/${token}`;

  res.status(200).json({
    status: "success",
    token: token,
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const token = req.params.id;
  const user = await authService.findByToken(token);

  if (!user) {
    return next(
      new ErrorHandler("Token Invalid or Expired, try again later!", 500)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match!", 400));
  }

  await authService.resetPassword(user, req.body.password);
  res.status(202).json({
    status: "success",
  });
});

export const protect = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const user = await authService.findById(decode.id);

    if (authService.isPasswordChanged(user, decode.iat)) {
      return next(
        new ErrorHandler("Password updated, please login again!", 401)
      );
    }

    req.user = user;
    next();
  } else {
    return next(new ErrorHandler("Please log in to access this route.", 401));
  }
});

export const isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const user = await authService.findById(decode.id);

    if (!user || authService.isPasswordChanged(user, decode.iat)) {
      return res.status(200).json({ status: "success NO" });
    }

    req.user = user;
    return res.status(200).json({ status: "success", user });
  } else {
    return res.status(200).json({ status: "success" });
  }
});
