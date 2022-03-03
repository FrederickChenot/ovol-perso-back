const express = require('express');

const router = express.Router();

const hikingController = require('../controllers/hiking.controllers');
const auth = require('../helpers/auth.helpers');

// id
router.route('/:id(\\d+)')
  .get(hikingController.getOne)
  .patch(auth(), hikingController.updateOne);
// all
router.route('/')
  .get(hikingController.getAll)
  .post(auth(), hikingController.create);

router.use((_req, res) => {
  res.json({ message: 'page not found' });
});

module.exports = router;
