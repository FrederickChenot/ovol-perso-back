const liftOffDataMapper = require('../models/liftOff');

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
  async create(req, res) {
    const result = await liftOffDataMapper.createOne(req.body);
    if (result) {
      return res.send(result);
    }
    return res.send('erreur liftOff');
  },
};
