const ApiError = require('../errors/apiError');
const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  console.log('Je passe la');
  let { statusCode, message } = err;

  statusCode = statusCode ?? 500;

  if (statusCode >= 500) logger.error(err);
  res.status(statusCode).send(message);
  return next;
};
module.exports = { ApiError, errorHandler };
