/* eslint-disable camelcase */
const landingDataMapper = require('../models/landing');

module.exports = {
  async getAll(_req, res) {
    const result = await landingDataMapper().findAll();
    if (!result) {
      return res.status(404).json({ message: 'landings not found' });
    }
    return res.json(result);
  },

  async getOne(req, res) {
    const IdLanding = Number(req.params.id);
    const result = await landingDataMapper().findByPk(IdLanding);
    if (!result) {
      return res.status(404).json({ message: 'landing not found' });
    }
    return res.json(result);
  },
  async getLandings(req, res) {
    const { ids } = req.body;
    const result = await landingDataMapper().findLandings(ids);
    if (!result) {
      return res.status(404).json({ message: 'landings not found' });
    }
    return res.json(result);
  },
  async create(req, res) {
    console.log(req);
    const result = await landingDataMapper().createOne(req.body);
    if (result) {
      return res.send(result);
    }
    return res.status(409).send('erreur create landing');
  },
  async patch(req, res) {
    const result = await landingDataMapper().update(Number(req.params.id), req.body);
    if (result) {
      return res.send(result);
    }
    return res.status(409).send('erreur update landing');
  },
};
