const jwt = require('jsonwebtoken');
const { read } = require('../utils/jsonDb');

const protect = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'reservafit_secret');

    const users = read('users.json');
    const user = users.find(item => item.id === decoded.id || item.id === decoded._id);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = {
      _id: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

const admin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }

  next();
};

module.exports = {
  protect,
  admin,
  adminOnly: admin,
};