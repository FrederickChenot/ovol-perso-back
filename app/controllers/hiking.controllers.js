const hikingDataMapper = require('../models/hiking');

module.exports = {
  async getAll(_req, res) {
    const hiking = await hikingDataMapper.findAll();
    return res.json(hiking);
  },

  async getOne(req, res) {
    const IdHiking = Number(req.params.id);
    console.log('id hiking', IdHiking);
    const hiking = await hikingDataMapper.findOne(IdHiking);
    return res.json(hiking);
  },
   create(req, res) {
    console.log('bienvenu sur le formulaire post');
    return res.send('bienvenu sur le formulaire post');
  },
};
