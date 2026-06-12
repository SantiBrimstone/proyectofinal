const FitnessClass = require('../models/FitnessClass');

const getClasses = async (req, res, next) => {
  try {
    const { category, level, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const classes = await FitnessClass.find(filter).populate('instructor').sort({ date: 1 });
    res.json(classes);
  } catch (error) { next(error); }
};

const getClassById = async (req, res, next) => {
  try {
    const fitnessClass = await FitnessClass.findById(req.params.id).populate('instructor');
    if (!fitnessClass) return res.status(404).json({ message: 'Clase no encontrada' });
    res.json(fitnessClass);
  } catch (error) { next(error); }
};

const createClass = async (req, res, next) => {
  try {
    const payload = { ...req.body, image: req.file?.path || req.body.image || '' };
    const fitnessClass = await FitnessClass.create(payload);
    res.status(201).json(fitnessClass);
  } catch (error) { next(error); }
};

const updateClass = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.file?.path) payload.image = req.file.path;
    const fitnessClass = await FitnessClass.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!fitnessClass) return res.status(404).json({ message: 'Clase no encontrada' });
    res.json(fitnessClass);
  } catch (error) { next(error); }
};

const deleteClass = async (req, res, next) => {
  try {
    const fitnessClass = await FitnessClass.findByIdAndDelete(req.params.id);
    if (!fitnessClass) return res.status(404).json({ message: 'Clase no encontrada' });
    res.json({ message: 'Clase eliminada' });
  } catch (error) { next(error); }
};

module.exports = { getClasses, getClassById, createClass, updateClass, deleteClass };
