'use strict';

const express = require('express');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Reddit Clone API Running'
  });
});

app.use('/auth', authRoutes);

const postRoutes = require('./routes/post.routes');

app.use('/posts', postRoutes);

module.exports = app;