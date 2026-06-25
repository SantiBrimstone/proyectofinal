const { read, write } = require('../utils/jsonDb');

const publicUser = user => ({
  _id: user.id,
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  createdAt: user.createdAt,
});

const getUsers = (_req, res, next) => {
  try {
    const users = read('users.json')
      .map(publicUser)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const updateRole = (req, res, next) => {
  try {
    const users = read('users.json');
    const index = users.findIndex(user => user.id === req.params.id || user._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    users[index].role = req.body.role;
    write('users.json', users);

    res.json(publicUser(users[index]));
  } catch (error) {
    next(error);
  }
};

const deleteUser = (req, res, next) => {
  try {
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'No puedes eliminar otra cuenta' });
    }

    const users = read('users.json');
    const filtered = users.filter(user => user.id !== req.params.id && user._id !== req.params.id);

    if (filtered.length === users.length) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    write('users.json', filtered);

    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
};

const updateProfile = (req, res, next) => {
  try {
    const users = read('users.json');
    const index = users.findIndex(user => user.id === req.user.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    users[index] = {
      ...users[index],
      name: req.body.name || users[index].name,
      avatar: req.file?.path || users[index].avatar,
    };

    write('users.json', users);

    res.json(publicUser(users[index]));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  updateRole,
  deleteUser,
  updateProfile
};