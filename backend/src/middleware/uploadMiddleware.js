require('dotenv').config();

const multer = require('multer');
const { storage } = require('../config/cloudinary');

console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET existe:', Boolean(process.env.CLOUDINARY_API_SECRET));

const hasCloudinary =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

console.log('Cloudinary activo:', Boolean(hasCloudinary));

const upload = hasCloudinary
  ? multer({ storage })
  : multer({ storage: multer.memoryStorage() });

module.exports = upload;