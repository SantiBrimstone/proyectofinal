const { read, write } = require('../utils/jsonDb');

const populateBooking = booking => {
  const users = read('users.json');
  const classes = read('classes.json');
  const instructors = read('instructors.json');

  const fitnessClass = classes.find(item => item.id === booking.fitnessClass || item.id === booking.classId);
  const instructor = fitnessClass
    ? instructors.find(item => item.id === fitnessClass.instructorId)
    : null;

  return {
    ...booking,
    user: users.find(user => user.id === booking.userId),
    fitnessClass: fitnessClass
      ? { ...fitnessClass, instructor }
      : null,
  };
};

const createBooking = (req, res, next) => {
  try {
    const { fitnessClass, classId, notes } = req.body;
    const selectedClassId = fitnessClass || classId;

    const classes = read('classes.json');
    const bookings = read('bookings.json');

    const targetClass = classes.find(item => item.id === selectedClassId || item._id === selectedClassId);

    if (!targetClass) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    const alreadyExists = bookings.find(
      booking =>
        booking.userId === req.user.id &&
        (booking.classId === selectedClassId || booking.fitnessClass === selectedClassId) &&
        booking.status !== 'cancelled'
    );

    if (alreadyExists) {
      return res.status(409).json({ message: 'Ya tienes una reserva para esta clase' });
    }

    const confirmed = bookings.filter(
      booking =>
        (booking.classId === selectedClassId || booking.fitnessClass === selectedClassId) &&
        booking.status === 'confirmed'
    ).length;

    if (confirmed >= Number(targetClass.capacity)) {
      return res.status(400).json({ message: 'Clase completa' });
    }

    const booking = {
      id: `booking-${Date.now()}`,
      userId: req.user.id,
      classId: selectedClassId,
      status: 'confirmed',
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);
    write('bookings.json', bookings);

    res.status(201).json(populateBooking(booking));
  } catch (error) {
    next(error);
  }
};

const getMyBookings = (req, res, next) => {
  try {
    const bookings = read('bookings.json')
      .filter(booking => booking.userId === req.user.id)
      .map(populateBooking)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

const cancelBooking = (req, res, next) => {
  try {
    const bookings = read('bookings.json');
    const index = bookings.findIndex(
      booking =>
        (booking.id === req.params.id || booking._id === req.params.id) &&
        booking.userId === req.user.id
    );

    if (index === -1) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    bookings[index].status = 'cancelled';
    write('bookings.json', bookings);

    res.json(bookings[index]);
  } catch (error) {
    next(error);
  }
};

const getAllBookings = (_req, res, next) => {
  try {
    const bookings = read('bookings.json')
      .map(populateBooking)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
};