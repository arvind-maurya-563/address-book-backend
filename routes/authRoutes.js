const express = require('express');
const { register, login, sendOtp, verifyOtp } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);

module.exports = router;
