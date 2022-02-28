const liftOffDataMapper = require('../models/lift-off');

module.exports = {
  async getAll(_req, res) {
    const hiking = await liftOffDataMapper.findAll();
    return res.json(hiking);
  },

  async getOne(req, res) {
    const IdHiking = Number(req.params.id);
    const hiking = await liftOffDataMapper.findOne(IdHiking);
    return res.json(hiking);
  },
};
