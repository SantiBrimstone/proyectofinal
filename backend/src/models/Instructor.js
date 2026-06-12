const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  specialty: { type: String, required: true },
  bio: { type: String, required: true },
  yearsExperience: { type: Number, default: 1 },
  rating: { type: Number, min: 1, max: 5, default: 4.5 },
  image: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Instructor', instructorSchema);
