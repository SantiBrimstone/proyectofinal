const bcrypt = require('bcryptjs');
const { read, write } = require('../utils/jsonDb');
const signToken = require('../utils/signToken');

const publicUser = user => ({
  _id: user.id,
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
});

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email y password son obligatorios' });
    }

    const users = read('users.json');
    const exists = users.find(user => user.email === email);

    if (exists) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('FILE:', req.file);

    const user = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: 'user',
      avatar: req.file?.path || '',
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    write('users.json', users);

    res.status(201).json({
      user: publicUser(user),
      token: signToken(user),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = read('users.json');

    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.json({
      user: publicUser(user),
      token: signToken(user),
    });
  } catch (error) {
    next(error);
  }
};

const me = (req, res) => {
  res.json({ user: req.user });
};

module.exports = { register, login, me };