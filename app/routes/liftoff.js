const express = require('express');

const router = express.Router();

const liftOffController = require('../controllers/liftOff.controllers');
const auth = require('../helpers/auth.helpers');

// id
router.route('/:id(\\d+)')
  .get(liftOffController.getOne)
  .patch(liftOffController.update);
// all
router.route('/')
  /**
 * GET /api/liftoff
 * @summary Get all liftoff
 * @tags LiftOff
 * @return {[LiftOff]} 200 - success response - application/json
 */
  .get(liftOffController.getAll)
  .post(auth(), liftOffController.create);

router.use((_req, res) => {
  res.status(404).json({ message: 'page not found' });
});

module.exports = router;
