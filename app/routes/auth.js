const express = require('express');

const router = express.Router();

const userController = require('../controllers/auth.controllers');

router.route('/')
  .post(userController.login);

router.use((_req, res) => {
  res.json({ message: 'page not found' });
});

module.exports = router;
