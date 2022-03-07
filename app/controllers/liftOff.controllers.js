const liftOffDataMapper = require('../models/liftOff');

module.exports = {
  async getAll(_req, res) {
    const result = await liftOffDataMapper().findAll();
    return res.json(result);
  },

  async getOne(req, res) {
    const IdHiking = Number(req.params.id);
    const result = await liftOffDataMapper().findOne(IdHiking);
    if (!result) {
      return res.status(404).json({ message: 'page not found' });
    }
    return res.json(result);
  },
  async create(req, res) {
    const result = await liftOffDataMapper().createOne(req.body);
    if (result) {
      return res.send(result);
    }
    return res.send('erreur liftOff');
  },
};
