const express = require('express');
const { loginOrRegister } = require('../controllers/authcontroller'); // Adjust path as needed
const router = express.Router();

// POST /api/auth/login
router.post('/login', loginOrRegister);

module.exports = router;