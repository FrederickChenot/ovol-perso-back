const ApiError = require('../errors/apiError');
const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  let { statusCode } = err;
  const { message } = err;
  statusCode = statusCode ?? 500;

  if (statusCode >= 500) logger.error(err);
  res.status(statusCode).json({ message });
  return next;
};
module.exports = { ApiError, errorHandler };
