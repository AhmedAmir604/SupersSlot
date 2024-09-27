//This is used to create Error objects according to our need :D
//and will listen for this object via express in error Controller :)
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.operational = true;
    this.status = `${
      toString(this.statusCode).startsWith("4") ? "Fail" : "Error"
    }`;
    Error.captureStackTrace(this, this.constructor);

    //Nice function to see error and call stack tell error occured :D
    console.log(this.stack);
  }
}

export default ErrorHandler;
