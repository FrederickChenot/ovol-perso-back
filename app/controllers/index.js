const itemController = require('./item');

const apiController = {
  home(req, res) {
    const fullUrl = `${req.protocol}://${req.get('host')}`;
    return res.json({
      documentation_url: `${fullUrl}${process.env.API_DOCUMENTATION_ROUTE}`,
    });
  },
};

module.exports = { apiController, itemController };
