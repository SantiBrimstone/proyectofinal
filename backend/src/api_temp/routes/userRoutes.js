const router = require('express').Router();
const { getUsers, updateRole, deleteUser, updateProfile } = require('../controllers/userController');
const { protect, adminOnly } = require('../../middleware/authMiddleware');
const upload = require('../../middleware/uploadMiddleware');

router.get('/', protect, adminOnly, getUsers);
router.patch('/:id/role', protect, adminOnly, updateRole);
router.patch('/me', protect, upload.single('avatar'), updateProfile);
router.delete('/:id', protect, deleteUser);

module.exports = router;
