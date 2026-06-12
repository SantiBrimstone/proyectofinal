const router = require('express').Router();
const { getUsers, updateRole, deleteUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getUsers);
router.patch('/:id/role', protect, adminOnly, updateRole);
router.delete('/:id', protect, deleteUser);

module.exports = router;
