const express = require('express');
const { login, register, oauthGoogle, requestOtp, verifyOtp } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// OAuth and OTP endpoints (ready for future completion)
router.post('/oauth/google', oauthGoogle);
router.post('/otp/request', requestOtp);
router.post('/otp/verify', verifyOtp);

module.exports = router;
