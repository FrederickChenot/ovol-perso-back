const express = require('express');

const router = express.Router();

const hikingRouter = require('./hiking');
const liftOffRouter = require('./liftoff');
const landingRouter = require('./landing');
const docRouter = require('./docs');
const authRouter = require('./auth');

// const { errorHandler } = require('../helpers/errorHandler');

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
  .post(landingController.getLandings);

router.use((err) => { console.log('JE PASSE LA erreur2', err); });

router.use((_req, res) => {
  res.status(404).json({ message: 'page not found' });
});

module.exports = router;
