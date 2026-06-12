const mongoose = require('mongoose');

const fitnessClassSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Yoga', 'HIIT', 'Pilates', 'Boxeo', 'Spinning', 'Fuerza'], required: true },
  description: { type: String, required: true },
  level: { type: String, enum: ['Inicial', 'Intermedio', 'Avanzado'], default: 'Inicial' },
  date: { type: Date, required: true },
  durationMinutes: { type: Number, required: true },
  capacity: { type: Number, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
}, { timestamps: true });

module.exports = mongoose.model('FitnessClass', fitnessClassSchema);
