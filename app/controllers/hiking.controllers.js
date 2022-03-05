const hikingDataMapper = require('../models/hiking');

module.exports = {
  async getAll(_req, res) {
    const result = await hikingDataMapper().findAll();
    return res.json(result);
  },

  async getOne(req, res) {
    const IdHiking = Number(req.params.id);
    const hiking = await hikingDataMapper().findByPk(IdHiking);
    if (!hiking) {
      return res.status(404).json({ message: 'page not found' });
    }
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

  async deleteOne(req, res) {
    const IdHiking = Number(req.params.id);
    const hiking = await hikingDataMapper().deleteOne(IdHiking);
    return res.json(hiking);
  },
};
