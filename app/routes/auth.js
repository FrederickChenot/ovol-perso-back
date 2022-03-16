/* eslint-disable no-throw-literal */
const express = require('express');
const apiController = require('../helpers/apiController');
const auth = require('../helpers/auth.helpers');

const router = express.Router();

const authController = require('../controllers/auth.controllers');

router.route('/check')
  .post(auth(), apiController(authController.check));

router.route('/')
  .post(apiController(authController.login));

router.use(() => {
  throw { message: 'page not found', statusCode: 404 };
});

module.exports = router;
