import { catchAsync } from "./errorController.js";
import ErrorHandler from "../utils/appError.js";
import jwt from "jsonwebtoken";
// import { authService } from "../services/authService.js";
import authService from "../services/AuthServices.js";

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
  const user = await authService.findOne({ email }, "+password");
  if (!user) {
    return next(new ErrorHandler("Cannot find User with this email!", 404));
  }
  //Dont need to send welcome email on every login its dumb and expensie :D
  // const url = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/bookings/my-bookings`;
  //Fix Url when front-end is completed :) right now the url is : http://127.0.0.1:8000/api/v1/bookings/my-bookings
  if (!(await authService.verifyPassword(password, user))) {
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
  const user = await authService.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("No user found with this email!", 404));
  }
  const url = `${req.protocol}://${req.get("host")}/users/resetPassword`;
  const token = await authService.generatePasswordResetToken(user, url);

  res.status(200).json({
    status: "success",
    token: token,
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const user = await authService.findByToken(req.params.id);

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
    const user = await authService.getOne(decode.id);

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
    const user = await authService.getOne(decode.id);

    if (!user || authService.isPasswordChanged(user, decode.iat)) {
      return res.status(200).json({ status: "success NO" });
    }

    req.user = user;
    return res.status(200).json({ status: "success", user });
  } else {
    return res.status(200).json({ status: "success" });
  }
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler("You are not allowed to access this :(", 500)
      );
    }
    next();
  };
};
