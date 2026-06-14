'use strict';

const bcrypt = require('bcrypt');

// Temporary database
const users = [];

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const existingUser = users.find(
      user =>
        user.email === email ||
        user.username === username
    );

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(newUser);

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

module.exports = {
  register
};



const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

module.exports = { login };