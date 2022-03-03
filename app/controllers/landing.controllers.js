/* eslint-disable camelcase */
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
  async getLandings(req, res) {
    const { ids } = req.body;
    const landings = await landingDataMapper.findLandings(ids);
    return res.json(landings);
  },
  async create(req, res) {
    const result = await landingDataMapper.createOne(req.body);
    if (result) {
      return res.send(result);
    }
    return res.send('erreur landing');
  },

};
