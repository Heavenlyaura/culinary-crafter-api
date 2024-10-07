const createError = require("http-errors");

function notFoundErrorHandler(req, res, next) {
  next(createError(404, "Resource not found"));
}

function errorHandlerToClient(err, req, res, next) {
  const status = err.status || 500;
  const message = status === 500 ? "An internal server error occurred." : err.message;
  res.status(status).json({
    error: {
      status,
      message,
    },
  });
}

module.exports = { notFoundErrorHandler, errorHandlerToClient };
