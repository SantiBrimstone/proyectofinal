const jwt = require('jsonwebtoken');

const signToken = user => {
  return jwt.sign(
    {
      id: user.id || user._id,
      role: user.role,
    },
    process.env.JWT_SECRET || 'reservafit_secret',
    { expiresIn: '7d' }
  );
};

module.exports = signToken;