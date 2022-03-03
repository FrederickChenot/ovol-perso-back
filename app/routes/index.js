const express = require('express');

const router = express.Router();

const userController = require('../controllers/auth.controllers');

const hikingController = require('../controllers/hiking.controllers');

const liftOffController = require('../controllers/lift-off.controllers');

const landingController = require('../controllers/landing.controllers');

const auth = require('../helpers/auth.helpers');

router
  .route('/api/login')
  .post(userController.login);

router
  .route('/api/hiking/:id')
  .get(hikingController.getOne)
  .patch(hikingController.updateOne);

router
  .route('/api/hiking')
  .get(hikingController.getAll)
  .post(auth(), hikingController.create);

router
  .route('/api/lift-off/:id')
  .get(liftOffController.getOne);

router
  .route('/api/lift-off')
  .get(liftOffController.getAll)
  .post(auth(), liftOffController.create);

router
  .route('/api/landing/:id')
  .get(landingController.getOne);

router
  .route('/api/landing')
  .get(landingController.getAll)
  .post(auth(), landingController.create);

router
  .route('/api/landings')
  .post(landingController.getLandings);

router.use((_req, res) => {
  res.json({ message: 'page not found' });
});

module.exports = router;
