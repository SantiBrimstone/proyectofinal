const Booking = require('../models/Booking');
const FitnessClass = require('../models/FitnessClass');

const createBooking = async (req, res, next) => {
  try {
    const { fitnessClass, notes } = req.body;
    const targetClass = await FitnessClass.findById(fitnessClass);
    if (!targetClass) return res.status(404).json({ message: 'Clase no encontrada' });

    const confirmed = await Booking.countDocuments({ fitnessClass, status: 'confirmed' });
    if (confirmed >= targetClass.capacity) return res.status(400).json({ message: 'Clase completa' });

    const booking = await Booking.create({ user: req.user._id, fitnessClass, notes });
    res.status(201).json(await booking.populate('fitnessClass'));
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'Ya tienes una reserva para esta clase' });
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({ path: 'fitnessClass', populate: { path: 'instructor' } })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) { next(error); }
};

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: 'cancelled' },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(booking);
  } catch (error) { next(error); }
};

const getAllBookings = async (_req, res, next) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').populate('fitnessClass', 'title date');
    res.json(bookings);
  } catch (error) { next(error); }
};

module.exports = { createBooking, getMyBookings, cancelBooking, getAllBookings };
