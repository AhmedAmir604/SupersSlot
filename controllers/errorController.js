import ErrorHandler from "../utils/appError.js";

export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
//Use for listening error provided by default express js

const handleDuplicateErrorDB = (err) => {
  let errMsg = "This Slot is already Booked!";
  if (err.keyValue.startTime) {
    errMsg = "This Slot is already Booked!";
  }
  return new ErrorHandler(errMsg, 500);
};

const errorProd = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
  });
};

const errorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  if (process.env.NODE_ENV === "development") {
    console.log("Express.JS Gloabal Error Listner :: errorHandler ", err);
    errorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (err.code === 11000) err = handleDuplicateErrorDB(err.errorResponse);
    errorProd(err, res);
  }
};
