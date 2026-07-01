const express = require('express');
const {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} = require('../controllers/classController');

const { protect, admin } = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/', getClasses);
router.get('/:id', getClassById);
router.post('/', protect, admin, createClass);
router.put('/:id', protect, admin, updateClass);
router.delete('/:id', protect, admin, deleteClass);

module.exports = router;