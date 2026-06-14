'use strict';

const express = require('express');
const router = express.Router();

const {
  register
} = require('../controllers/auth.controller');

router.post('/register', register);


const { login } = require('../controllers/auth.controller');

router.post('/login', login);

module.exports = router;