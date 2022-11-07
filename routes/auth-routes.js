const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect e-mail').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Something went wrong while creating user',
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'This e-mail has been already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'User has been created!' });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong. Try again' });
    }
  },
);

// api/auth/login
router.post(
  '/login',
  [check('email', 'Enter correct e-mail').normalizeEmail().isEmail(), check('password', 'Enter password').exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Something went wrong while login',
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return res.status(400).json({ message: 'Incorrect e-mail or password' });
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwt_secret_key'), { expiresIn: '1h' });
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong. Try again' });
    }
  },
);

module.exports = router;
