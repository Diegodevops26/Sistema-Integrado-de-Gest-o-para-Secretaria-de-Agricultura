const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authcontroller');

router.post('/login', AuthController.login);
router.get('profile', AuthController.authenticateToken, AuthController.getProfile);

module.exports = router;