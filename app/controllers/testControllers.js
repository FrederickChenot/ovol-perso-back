const landingDataMapper = require('../models/landing');

module.exports = {
  async getTest(req, res) {
    const { ids } = req.body;
    const landings = await landingDataMapper.findTable(ids);
    return res.json(landings);
  },
};
