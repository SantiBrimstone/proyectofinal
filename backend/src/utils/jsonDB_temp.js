const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db');

const read = (file) => {
  const fullPath = path.join(dbPath, file);
  if (!fs.existsSync(fullPath)) return [];
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
};

const write = (file, data) => {
  fs.writeFileSync(path.join(dbPath, file), JSON.stringify(data, null, 2));
};

module.exports = { read, write };