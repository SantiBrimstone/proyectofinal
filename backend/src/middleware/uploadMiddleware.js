const multer = require('multer');
const { storage } = require('../config/cloudinary');

const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

const upload = hasCloudinary
  ? multer({ storage })
  : multer({ storage: multer.memoryStorage() });

module.exports = upload;
