const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const dataDir = path.join(__dirname, '..', 'data');
const dbDir = path.join(__dirname, '..', 'db');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const readCsv = fileName => new Promise((resolve, reject) => {
  const rows = [];

  fs.createReadStream(path.join(dataDir, fileName))
    .pipe(csv())
    .on('data', row => rows.push(row))
    .on('end', () => resolve(rows))
    .on('error', reject);
});

const writeJson = (fileName, data) => {
  fs.writeFileSync(
    path.join(dbDir, fileName),
    JSON.stringify(data, null, 2),
    'utf-8'
  );
};

const seed = async () => {
  const usersCsv = await readCsv('users.csv');
  const instructorsCsv = await readCsv('instructors.csv');
  const classesCsv = await readCsv('classes.csv');
  const bookingsCsv = await readCsv('bookings.csv');

  const users = usersCsv.map((user, index) => ({
    id: `user-${index + 1}`,
    ...user,
    password: user.password || '123456',
  }));

  const instructors = instructorsCsv.map((instructor, index) => ({
    id: `instructor-${index + 1}`,
    ...instructor,
    yearsExperience: Number(instructor.yearsExperience),
    rating: Number(instructor.rating),
  }));

  const instructorByName = new Map(
    instructors.map(instructor => [instructor.fullName, instructor.id])
  );

  const categoryImages = {
  Yoga: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
  HIIT: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=1200&q=80',
  Pilates: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
  Boxeo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80',
  Spinning: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
  Fuerza: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
};

  const classes = classesCsv.map((item, index) => ({
    id: `class-${index + 1}`,
    title: item.title,
    category: item.category,
    description: item.description,
    level: item.level,
    date: item.date,
    durationMinutes: Number(item.durationMinutes),
    capacity: Number(item.capacity),
    location: item.location,
    price: Number(item.price),
    image: item.image || categoryImages[item.category] || '',
    instructorId: instructorByName.get(item.instructorName),
  }));

  const userByEmail = new Map(users.map(user => [user.email, user.id]));
  const classByTitle = new Map(classes.map(item => [item.title, item.id]));

  const bookings = bookingsCsv
    .filter(row => userByEmail.get(row.userEmail) && classByTitle.get(row.classTitle))
    .map((row, index) => ({
      id: `booking-${index + 1}`,
      userId: userByEmail.get(row.userEmail),
      classId: classByTitle.get(row.classTitle),
      status: row.status,
      notes: row.notes,
    }));

  writeJson('users.json', users);
  writeJson('instructors.json', instructors);
  writeJson('classes.json', classes);
  writeJson('bookings.json', bookings);

  console.log('Seed completada usando JSON local.');
  console.log('Admin: admin@reservafit.com / 123456');
};

seed().catch(error => {
  console.error(error);
  process.exit(1);
});