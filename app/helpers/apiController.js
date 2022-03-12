/**
 * Controller wrapper to manage errors
 * @param {object} controller a controller to execute iside a try… catch… block
 * @returns {object} a controller as middleware function
 */
module.exports = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    // the format of the error is a objet {statusCode: 'codeError HTTP', message: 'the message'}
    if (err.statusCode) {
      res.status(err.statusCode).json(err.message);
    } else {
      res.status(500).json('Internal server error');
    }
  }
};
