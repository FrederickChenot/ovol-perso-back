/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = () => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token> => on recupere seulement le token
  const error = { message: ' utilisateur non authentifié', statusCode: 401 };

  if (!token) throw error;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) throw error;
    req.user = user;
    next();
  });
};
