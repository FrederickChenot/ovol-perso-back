/**
 * @typedef {object} ApiError
 * @property {string} status - Status
 * @property {number} statusCode - HTTP Status code
 * @property {string} message - Error message
 */
module.exports = class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
};
