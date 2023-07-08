const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('./error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('You are not logged in'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
