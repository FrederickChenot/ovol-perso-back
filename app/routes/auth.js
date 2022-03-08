const express = require('express');
const apiController = require('../helpers/apiController');

const router = express.Router();

const authController = require('../controllers/auth.controllers');

router.route('/')
  .post(apiController(authController.login));

router.use((_req, res) => {
  res.status(404).json({ message: 'page not found' });
});

module.exports = router;
