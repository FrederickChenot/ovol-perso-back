/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
const express = require('express');
const apiController = require('../helpers/apiController');

const router = express.Router();

const liftOffController = require('../controllers/liftOff.controllers');
const auth = require('../helpers/auth.helpers');

// id
router.route('/:id(\\d+)')
  .get(apiController(liftOffController.getOne))
  .patch(apiController(liftOffController.patch));
// all
router.route('/')
  /**
 * GET /api/liftoff
 * @summary Get all liftoff
 * @tags LiftOff
 * @return {[LiftOff]} 200 - success response - application/json
 */
  .get(apiController(liftOffController.getAll))
  .post(apiController(auth()), apiController(liftOffController.create));

router.use((_req, res) => {
  throw ({ statusCode: 404, message: 'Page liftoff not found' });
});

module.exports = router;
