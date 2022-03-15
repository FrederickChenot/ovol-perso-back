const liftOffDataMapper = require('../models/liftOff');

module.exports = {

  async getAll(_req, res) {
    const result = await liftOffDataMapper().findAll();
    const error = { statusCode: 404, message: 'Liftoff not found' };
    if (!result) throw error;
    return res.json(result);
  },

  async getOne(req, res) {
    const result = await liftOffDataMapper().findByPk(Number(req.params.id));
    const error = { statusCode: 404, message: 'Liftoff not found' };
    if (!result) throw error;
    return res.json(result);
  },

  async create(req, res) {
    const result = await liftOffDataMapper().createOne(req.body);
    if (result) res.send(result);
    const error = { statusCode: 409, message: 'Erreur create landing' };
    throw error;
  },

  async patch(req, res) {
    const result = await liftOffDataMapper().updateOne(Number(req.params.id), req.body);
    if (result) res.send(result);
    const error = { statusCode: 409, message: 'Erreur update landing' };
    throw error;
  },
};
