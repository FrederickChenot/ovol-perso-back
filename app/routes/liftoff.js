const express = require('express');

const router = express.Router();

const liftOffController = require('../controllers/liftOff.controllers');
const auth = require('../helpers/auth.helpers');

// id
router.route('/:id(\\d+)')
  .get(liftOffController.getOne);
// all
router.route('/')
  .get(liftOffController.getAll)
  .post(auth(), liftOffController.create);

router.use((_req, res) => {
  res.json({ message: 'page not found' });
});

module.exports = router;
