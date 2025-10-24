const jwt = require('jsonwebtoken');

function generateToken(id) {
  const secret = process.env.JWT_SECRET || 'change_this_secret_for_prod';
  return jwt.sign({ id }, secret, { expiresIn: '1d' });
}

module.exports = generateToken;
