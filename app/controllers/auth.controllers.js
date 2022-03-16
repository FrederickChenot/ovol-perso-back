/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');
const userDataMapper = require('../models/user');

module.exports = {
  generateAccessToken: (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET),
  async login(req, res) {
    // Genere le token jwt pour le user

    async function generateAccessToken(user) {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    }
    const { user, pass } = req.body;
    // recupere le user si il existe
    const result = await userDataMapper.findUser(user);
    const error = { message: 'Login/Password invalide', statusCode: 401 };

    if (!result) throw error;
    if (result.password !== pass) throw error;

    const accessToken = await generateAccessToken(user);
    // on retourne le token
    const { id } = result;
    return res.send({ accessToken, id });
  },

  async check(req, res) {
    // Genere le token jwt pour le user
    async function generateAccessToken(user) {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    }
    const { user } = req;
    const result = await userDataMapper.findUser(user);
    if (!result) throw ({ statusCode: 404, message: 'identifiant inconnu' });
    const accessToken = await generateAccessToken(user);
    if (result) {
      return res.json({
        logged: true,
        userId: result.id,
        accessToken,
      });
    }

    throw ({ statusCode: 500, message: 'identification interdite' });
  },

};
