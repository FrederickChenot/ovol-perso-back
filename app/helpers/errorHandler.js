const ApiError = require('../errors/apiError');
const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  // let { statusCode, message } = err;

  // statusCode = statusCode ?? 500;

  // if (statusCode >= 500) {
  //   logger.error(err);
  //   // res.app.get('env') === process.env.NODE_ENV
  //   if (res.app.get('env') === 'production') {
  //     message = 'Internal server error';
  //   }
  // }
  return next(err, req, res, next);
};
module.exports = { ApiError, errorHandler };
