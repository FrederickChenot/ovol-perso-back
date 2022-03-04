const express = require('express');

const router = express.Router();

const landingController = require('../controllers/landing.controllers');
const auth = require('../helpers/auth.helpers');

// id
router.route('/:id(\\d+)')
  .get(landingController.getOne)
  .patch(auth(), landingController.patch);

// all
router.route('/')
  /**
  * GET /api/landing
  * @summary Get all landing
  * @tags Landing
  * @return {[Landing]} 200 - success response - application/json
  */
  .get(landingController.getAll)
  .post(auth(), landingController.create);

router.use((_req, res) => {
  res.status(404).json({ message: 'page not found' });
});

module.exports = router;
