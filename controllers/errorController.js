export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
//Use for listening error provided by default express js

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
  // if (process.env.NODE_ENV === "development") {
  //   errorDev(err, res);
  // } else {
  //   let error = { ...err };
  //   error.message = err.message;
  // }
  console.log("errorHandler:::", err);
  errorDev(err, res);
};
