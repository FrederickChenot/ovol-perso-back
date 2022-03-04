const jwt = require('jsonwebtoken');
const userDataMapper = require('../models/user');

module.exports = {

  async login(req, res) {
    // Genere le token jwt pour le user
    function generateAccessToken(user) {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    }
    const { user, pass } = req.body;
    // recupere le user si il existe
    const result = await userDataMapper.findUser(user);
    if (!result) {
      return res.status(401).send('Login/Password invalide');
    }
    if (result.password !== pass) {
      return res.status(401).send('Login/Password invalide');
    }
    const accessToken = generateAccessToken(user);
    // on retourne le token 
    return res.send({ accessToken });
  },
};
