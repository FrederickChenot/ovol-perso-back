const hikingDataMapper = require('../models/hiking');

module.exports = {
  async getAll(_req, res) {
    const hiking = await hikingDataMapper().findAll();
    return res.json(hiking);
  },

  async getOne(req, res) {
    const IdHiking = Number(req.params.id);
    const hiking = await hikingDataMapper().findByPk(IdHiking);
    return res.json(hiking);
  },
  async create(req, res) {
    const hiking = await hikingDataMapper().creatOne(req.body);
    return res.json(hiking);
  },

  async updateOne(req, res) {
    const hiking = await hikingDataMapper().updateOne(req.params.id, req.body);
    return res.json(hiking);
  },
};
