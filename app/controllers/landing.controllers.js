/* eslint-disable camelcase */
const landingDataMapper = require('../models/landing');

module.exports = {
  async getAll(_req, res) {
    const landing = await landingDataMapper().findAll();
    return res.json(landing);
  },

  async getOne(req, res) {
    const IdLanding = Number(req.params.id);
    const result = await landingDataMapper().findByPk(IdLanding);
    if (!result) {
      return res.status(404).json({ message: 'page not found' });
    }
    return res.json(result);
  },
  async getLandings(req, res) {
    const { ids } = req.body;
    const landings = await landingDataMapper().findLandings(ids);
    return res.json(landings);
  },
  async create(req, res) {
    const result = await landingDataMapper().createOne(req.body);
    if (result) {
      return res.send(result);
    }
    return res.send('erreur landing');
  },
  async patch(req, res) {
    const result = await landingDataMapper().update(Number(req.params.id), req.body);
    if (result) {
      return res.send(result);
    }
    return res.send('erreur update landing');
  },
};
