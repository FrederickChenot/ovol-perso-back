/* eslint-disable camelcase */
const landingDataMapper = require('../models/landing');

module.exports = {
  async getAll(_req, res) {
    const result = await landingDataMapper().findAll();
    const error = { message: 'landings not found', statusCode: 404 };
    if (!result) throw error;
    return res.json(result);
  },

  async getOne(req, res) {
    const IdLanding = Number(req.params.id);
    const result = await landingDataMapper().findByPk(IdLanding);
    const error = { message: 'landings not found', statusCode: 404 };
    if (!result) throw error;
    return res.json(result);
  },
  // finds many landing in a array
  async getLandings(req, res) {
    const { ids } = req.body;
    const result = await landingDataMapper().findLandings(ids);
    const error = { message: 'landings not found', statusCode: 404 };
    if (!result) throw error;
    return res.json(result);
  },
  async create(req, res) {
    const result = await landingDataMapper().createOne(req.body);
    const error = { message: 'erreur create landing', statusCode: 409 };
    if (!result) throw error;
    return res.send(result);
  },
  async patch(req, res) {
    const result = await landingDataMapper().update(Number(req.params.id), req.body);
    const error = { message: 'erreur update landing', statusCode: 409 };
    if (!result) throw error;
    return res.send(result);
  },
};
