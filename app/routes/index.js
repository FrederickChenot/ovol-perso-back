const express = require('express');
const { errorHandler } = require('../helpers/errorHandler');

const router = express.Router();

const { itemController } = require('../controllers');
const controllerHandler = require('../helpers/apiControllerHandler');
const { apiController } = require('../controllers');

const { createItemSchema } = require('../validation/validator');

router
  .route('/api/item')
  /**
   * GET /api/item
   * @summary Get all items
   * @tags Item
   * @return {[Item]} 200 - success response - application/json
   */
  .get(controllerHandler(itemController.getAll))
  /**
   * POST /api/item
   * @summary Post a item
   * @tags Item
   * @param {InputItem} request.body.required - item infos
   * @return {[Item]} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   */
  .post(createItemSchema, controllerHandler(itemController.create));

router.route('/api').get(controllerHandler(apiController.home));
router.use((err, _, response, next) => {
  errorHandler(err, response, next);
});

module.exports = router;
