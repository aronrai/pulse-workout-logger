const CustomError = require("../utils/customError");

const globalErrorController = (err, req, res, next) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message || "Something went wrong",
      status: err.status || "error",
    });
  } else {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      status: "error",
    });
  }
};

module.exports = globalErrorController;
