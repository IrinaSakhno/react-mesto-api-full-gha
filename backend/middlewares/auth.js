const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('./error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError('You are not logged in'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
