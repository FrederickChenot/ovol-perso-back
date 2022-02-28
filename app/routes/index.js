const express = require('express');

const router = express.Router();

const hikingController = require('../controllers/hiking.controllers');
const liftOffController = require('../controllers/lift-off.controllers');

router.route('/api/hiking/:id').get(hikingController.getOne);
router.route('/api/hiking').get(hikingController.getAll);

router.route('/api/lift-off/:id').get(liftOffController.getOne);
router.route('/api/lift-off').get(liftOffController.getAll);

router.use((_req, res) => {
  res.json({ message: 'page not found' });
});

module.exports = router;
