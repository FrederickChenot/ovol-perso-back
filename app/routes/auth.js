const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controllers');

router.route('/')
  .post(authController.login);

router.use((_req, res) => {
  res.json({ message: 'page not found' });
});

module.exports = router;
