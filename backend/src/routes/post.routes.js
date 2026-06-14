'use strict';

const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth.middleware');

router.post('/', authenticate, async (req, res) => {
  // Only runs if user is logged in

  const userId = req.user.userId;

  res.json({
    message: 'Post created',
    userId
  });
});

module.exports = router;