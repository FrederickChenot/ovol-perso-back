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
    const error = { message: 'Login/Password invalide', statusCode: 401 };

    if (!result) throw error;
    if (result.password !== pass) throw error;

    const accessToken = generateAccessToken(user);
    // on retourne le token
    const { id } = result;
    return res.send({ accessToken, id });
  },
};
