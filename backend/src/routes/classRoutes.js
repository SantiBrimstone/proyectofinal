const router = require('express').Router();
const { getClasses, getClassById, createClass, updateClass, deleteClass } = require('../controllers/classController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getClasses);
router.get('/:id', getClassById);
router.post('/', protect, adminOnly, upload.single('image'), createClass);
router.put('/:id', protect, adminOnly, upload.single('image'), updateClass);
router.delete('/:id', protect, adminOnly, deleteClass);

module.exports = router;
