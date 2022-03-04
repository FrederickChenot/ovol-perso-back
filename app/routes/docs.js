const express = require('express');

const router = express.Router();

const docsController = require('../controllers/docs.controllers');

// all
router.route('/')
  .get(docsController.home);

router.use((_req, res) => {
  res.json({ message: 'page not found' });
});

module.exports = router;
