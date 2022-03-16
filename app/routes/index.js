const express = require('express');

const router = express.Router();
const apiController = require('../helpers/apiController');

const hikingRouter = require('./hiking');
const liftOffRouter = require('./liftoff');
const landingRouter = require('./landing');
const docRouter = require('./docs');
const authRouter = require('./auth');

const { errorHandler } = require('../helpers/errorHandler');

const landingController = require('../controllers/landing.controllers');

router
  .use('/api/docs', docRouter);

router
  .use('/api/login', authRouter);

router
  .use('/api/hiking', hikingRouter);

router
  .use('/api/liftOff', liftOffRouter);

router
  .use('/api/landing', landingRouter);

router
  .route('/api/landings')
  .post(apiController(landingController.getLandings));

router.use((_req, res) => {
  res.status(404).json({ message: 'page not found' });
});

router.use(errorHandler);
module.exports = router;
