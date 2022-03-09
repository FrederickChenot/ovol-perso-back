const liftOffDataMapper = require('../models/liftOff');

module.exports = {
  async getAll(_req, res) {
    const result = await liftOffDataMapper().findAll();
    return res.json(result);
  },

  async getOne(req, res) {
    const result = await liftOffDataMapper().findByPk(Number(req.params.id));
    // COMPASS
    //TODO : attribuer une balise
    const balise = 67;
    result[0].balise = balise
    //
    if (!result) {
      return res.status(404).json({ message: 'page not found' });
    }
    console.log('liftoff result', result);
    return res.json(result);
  },

  async create(req, res) {
    const result = await liftOffDataMapper().createOne(req.body);
    if (result) {
      return res.send(result);
    }
    return res.send('erreur liftOff');
  },

  async update(req, res) {
    const result = await liftOffDataMapper().updateOne(Number(req.params.id), req.body);
    if (!result) {
      return res.status(404).json({ message: 'page not found' });
    }
    return res.json(result);
  },
};
