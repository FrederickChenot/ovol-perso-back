const hikingDataMapper = require('../models/hiking');

module.exports = {
  async getAll(_req, res) {
    const result = await hikingDataMapper().findAll();
    const error = { statusCode: 404, message: 'Hiking not found' };
    if (!result) throw error;
    return res.json(result);
  },

  async getOne(req, res) {
    const IdHiking = Number(req.params.id);
    const result = await hikingDataMapper().findByPk(IdHiking);
    const error = { statusCode: 404, message: 'Hiking not found' };
    if (!result) throw error;
    return res.json(result);
  },

  async create(req, res) {
    const result = await hikingDataMapper().creatOne(req.body);
    if (result) res.send(result);
    const error = { statusCode: 409, message: 'Erreur create hiking' };
    throw error;
  },

  async updateOne(req, res) {
    const result = await hikingDataMapper().updateOne(req.params.id, req.body);
    if (result) res.send(result);
    const error = { statusCode: 409, message: 'Erreur update hiking' };
    throw error;
  },

  async deleteOne(req, res) {
    const IdHiking = Number(req.params.id);
    const hiking = await hikingDataMapper().deleteOne(IdHiking);
    return res.json(hiking);
  },
};
