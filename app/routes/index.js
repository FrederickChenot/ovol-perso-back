const express = require('express');

const router = express.Router();

const itemController = require('../controllers/item.controllers');


router
  .route('/api/item')
  .get(itemController.getAll)
  .post(itemController.create);

router.use((err, _, res, next) => {
  res.json({message : 'page not found'});
});

module.exports = router;
