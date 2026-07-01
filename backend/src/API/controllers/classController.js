const { read, write } = require('../../utils/jsonDb');

const addInstructor = fitnessClass => {
  const instructors = read('instructors.json');

  return {
    ...fitnessClass,
    instructor: instructors.find(instructor => instructor.id === fitnessClass.instructorId),
  };
};

const getClasses = (req, res, next) => {
  try {
    const { category, level, search } = req.query;

    let classes = read('classes.json');

    if (category) {
      classes = classes.filter(item => item.category === category);
    }

    if (level) {
      classes = classes.filter(item => item.level === level);
    }

    if (search) {
      classes = classes.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    classes = classes
      .map(addInstructor)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(classes);
  } catch (error) {
    next(error);
  }
};

const getClassById = (req, res, next) => {
  try {
    const classes = read('classes.json');
    const fitnessClass = classes.find(item => item.id === req.params.id || item._id === req.params.id);

    if (!fitnessClass) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    res.json(addInstructor(fitnessClass));
  } catch (error) {
    next(error);
  }
};

const createClass = (req, res, next) => {
  try {
    const classes = read('classes.json');

    const fitnessClass = {
      id: `class-${Date.now()}`,
      ...req.body,
      image: req.file?.path || req.body.image || '',
      capacity: Number(req.body.capacity),
      price: Number(req.body.price),
      durationMinutes: Number(req.body.durationMinutes),
      createdAt: new Date().toISOString(),
    };

    classes.push(fitnessClass);
    write('classes.json', classes);

    res.status(201).json(fitnessClass);
  } catch (error) {
    next(error);
  }
};

const updateClass = (req, res, next) => {
  try {
    const classes = read('classes.json');
    const index = classes.findIndex(item => item.id === req.params.id || item._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    classes[index] = {
      ...classes[index],
      ...req.body,
      image: req.file?.path || req.body.image || classes[index].image,
    };

    write('classes.json', classes);

    res.json(classes[index]);
  } catch (error) {
    next(error);
  }
};

const deleteClass = (req, res, next) => {
  try {
    const classes = read('classes.json');
    const filtered = classes.filter(item => item.id !== req.params.id && item._id !== req.params.id);

    if (filtered.length === classes.length) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    write('classes.json', filtered);

    res.json({ message: 'Clase eliminada' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};