require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const connectDB = require('../config/db');
const User = require('../models/User');
const Instructor = require('../models/Instructor');
const FitnessClass = require('../models/FitnessClass');
const Booking = require('../models/Booking');

const readCsv = fileName => new Promise((resolve, reject) => {
  const rows = [];
  fs.createReadStream(path.join(__dirname, '..', 'data', fileName))
    .pipe(csv())
    .on('data', row => rows.push(row))
    .on('end', () => resolve(rows))
    .on('error', reject);
});

const seed = async () => {
  await connectDB();
  await Promise.all([User.deleteMany(), Instructor.deleteMany(), FitnessClass.deleteMany(), Booking.deleteMany()]);

  const usersCsv = await readCsv('users.csv');
  const instructorsCsv = await readCsv('instructors.csv');
  const classesCsv = await readCsv('classes.csv');
  const bookingsCsv = await readCsv('bookings.csv');

  const users = await User.insertMany(usersCsv.map(user => ({ ...user, password: user.password || '123456' })));
  const instructors = await Instructor.insertMany(instructorsCsv.map(instructor => ({
    ...instructor,
    yearsExperience: Number(instructor.yearsExperience),
    rating: Number(instructor.rating),
  })));

  const userByEmail = new Map(users.map(user => [user.email, user._id]));
  const instructorByName = new Map(instructors.map(instructor => [instructor.fullName, instructor._id]));

  const classes = await FitnessClass.insertMany(classesCsv.map(item => ({
    title: item.title,
    category: item.category,
    description: item.description,
    level: item.level,
    date: new Date(item.date),
    durationMinutes: Number(item.durationMinutes),
    capacity: Number(item.capacity),
    location: item.location,
    price: Number(item.price),
    image: item.image,
    instructor: instructorByName.get(item.instructorName),
  })));

  const classByTitle = new Map(classes.map(item => [item.title, item._id]));
  await Booking.insertMany(bookingsCsv
    .filter(row => userByEmail.get(row.userEmail) && classByTitle.get(row.classTitle))
    .map(row => ({ user: userByEmail.get(row.userEmail), fitnessClass: classByTitle.get(row.classTitle), status: row.status, notes: row.notes })));

  console.log('Seed completada. Admin: admin@reservafit.com / 123456');
  process.exit(0);
};

seed().catch(error => {
  console.error(error);
  process.exit(1);
});
