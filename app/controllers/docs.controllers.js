module.exports = {
  async home(req, res) {
    const fullUrl = `${req.protocol}://${req.get('host')}`;
    return res.json({
      documentation_url: `${fullUrl}${process.env.API_DOCUMENTATION_ROUTE}`,
    });
  },
};
