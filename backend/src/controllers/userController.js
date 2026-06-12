const User = require('../models/User');

const getUsers = async (_req, res, next) => {
  try {
    res.json(await User.find().select('-password').sort({ createdAt: -1 }));
  } catch (error) { next(error); }
};

const updateRole = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) { next(error); }
};

const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'No puedes eliminar otra cuenta' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) { next(error); }
};

module.exports = { getUsers, updateRole, deleteUser };
