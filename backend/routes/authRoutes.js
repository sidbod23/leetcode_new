const express = require('express');
const router = express.Router();
const { login, verify } = require('../controllers/authController');


router.post('/login', login);
router.get('/me', verify);

module.exports = router;