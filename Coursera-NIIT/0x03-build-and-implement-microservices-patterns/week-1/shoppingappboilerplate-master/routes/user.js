const express = require('express');

const addUser = require('../controllers/user')

const router = express.Router();
router.post('/', addUser);

// Write the code to specify the route of addUser method

module.exports = router;