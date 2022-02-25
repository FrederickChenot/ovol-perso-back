const itemDataMapper = require('../models/item');
const { ApiError } = require('../helpers/errorHandler');

module.exports = {
  /**
   * Item controller to get all records.
   * ExpressMiddleware signature
   * @param {object} _ Express req.object (not used)
   * @param {object} res Express response object
   * @returns {string} Route API JSON response
   */
  async getAll(_, res) {
    const posts = await itemDataMapper.findAll();
    return res.json(posts);
  },
  /**
   * Item controller to create a record.
   * ExpressMiddleware signature
   * @param {object} req Express req.object (not used)
   * @param {object} res Express response object
   * @returns {string} Route API JSON response
   */
  async create(req, res) {
    const item = await itemDataMapper.findByLabel(req.body.label);
    if (item) {
      throw new ApiError(400, 'Item already exists with this label');
    }

    const savedItem = await itemDataMapper.insert(req.body);
    return res.json(savedItem);
  },
};
