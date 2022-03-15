/* eslint-disable no-throw-literal */
const express = require('express');

const router = express.Router();

const docsController = require('../controllers/docs.controllers');

// all
router.route('/')
  .get(docsController.home);

router.use(() => {
  throw { message: 'page not found', statusCode: 404 };
});

module.exports = router;
