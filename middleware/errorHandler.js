const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  // Sequelize database error
  if (err.name === "SequelizeDatabaseError") {
    const message = "Database error";
    error = new ErrorResponse(message, 500);
  }

  // Sequelize validation error
  if (err.name === "SequelizeValidationError") {
    const message = err.errors.map((e) => e.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
