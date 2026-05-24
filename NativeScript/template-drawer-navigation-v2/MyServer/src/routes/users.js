const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { register, login, loginWithDevice, getUserData, syncUserData } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.post('/login/device', loginWithDevice);
router.get('/me', authenticate, getUserData);
router.post('/sync', authenticate, syncUserData);

module.exports = router;