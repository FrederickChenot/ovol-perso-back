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
  .get(landingController.getAll)
  .post(auth(), landingController.create);

router.use((_req, res) => {
  res.status(404).json({ message: 'page not found' });
});

module.exports = router;
