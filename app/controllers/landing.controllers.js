/* eslint-disable camelcase */
const landingDataMapper = require('../models/landing');
const { create } = require('./hiking.controllers');

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
    const {
      name,
      typeOfTerrain,
      description,
      danger,
      fflvLink,
      latitude,
      longitude,
      favorableWind,
      unfavorableWind,
      altitude,
    } = req.body;
    const result = await landingDataMapper.createOne(
      name,
      typeOfTerrain,
      description,
      danger,
      fflvLink,
      latitude,
      longitude,
      favorableWind,
      unfavorableWind,
      altitude,
    );
    if (result) {
      return res.send('Ok');
    }
    return res.send('erreur landing');
  },

};
