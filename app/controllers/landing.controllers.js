const landingDataMapper = require('../models/landing');

module.exports = {
  async getAll(_req, res) {
    const landing = await landingDataMapper.findAll();
    return res.json(landing);
  },

  async getOne(req, res) {
    const IdLanding = Number(req.params.id);
    const landing = await landingDataMapper.findOne(IdLanding);
    return res.json(landing);
  },
};
