const express = require('express');
const router = express.Router();
const { authenticateUser, autherizeUser} = require('../middleware/authMiddleware');
const { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } = require('../controllers/userController');

router.post('/users', createUser);

module.exports = router;
