const User = require('../models/User');
const signToken = require('../utils/signToken');

const publicUser = user => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
});

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'name, email y password son obligatorios' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'El email ya está registrado' });

    const user = await User.create({ name, email, password, avatar: req.file?.path || '' });
    res.status(201).json({ user: publicUser(user), token: signToken(user) });
  } catch (error) { next(error); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Credenciales incorrectas' });
    res.json({ user: publicUser(user), token: signToken(user) });
  } catch (error) { next(error); }
};

const me = (req, res) => res.json({ user: req.user });

module.exports = { register, login, me };
