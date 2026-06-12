const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fitnessClass: { type: mongoose.Schema.Types.ObjectId, ref: 'FitnessClass', required: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  notes: { type: String, default: '' },
}, { timestamps: true });

bookingSchema.index({ user: 1, fitnessClass: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
