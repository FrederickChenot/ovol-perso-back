const jwt = require('jsonwebtoken');
const userDataMapper = require('../models/user');

module.exports = {

  async login(req, res) {
    function generateAccessToken(user) {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    }
    const { user, pass } = req.body;
    const result = await userDataMapper.findUser(user);
    if (!result) {
      return res.status(401).send('Login/Password invalide"');
    }
    if (result.password !== pass) {
      return res.status(401).send('Login/Password invalide"');
    }
    const accessToken = generateAccessToken(user);
    console.log(accessToken);
    return res.send({ accessToken });
  },
};
