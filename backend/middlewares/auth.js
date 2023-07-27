const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('./error');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('You are not logged in'));
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'JWT');
  } catch (err) {
    next(new UnauthorizedError('You are not logged in'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};

module.exports = auth;
