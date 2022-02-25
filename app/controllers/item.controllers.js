const itemDataMapper = require('../models/item');

module.exports = {

  async getAll(_, res) {
    const posts = await itemDataMapper.findAll();
    return res.json(posts);
  },

  async create(req, res) {
    const item = await itemDataMapper.findByLabel(req.body.label);
    if (item) {
     console.log("error ,item already exist");
    }
    const savedItem = await itemDataMapper.insert(req.body);
    return res.json(savedItem);
  },
};
