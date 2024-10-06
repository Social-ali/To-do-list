const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
const jwt = require('jsonwebtoken');

// Define the JWT secret key
const JWT_SECRETS = process.env.JWT_SECRET || 'your-secret-key-here'; // Use environment variable or default key

// Route 1: Create a user using: POST "/api/auth/create-user". Doesn't require auth
router.post('/create-user', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Log the request body
    console.log(req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hash the password

    // Create and save a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword // Save the hashed password
    });

    await user.save();

    // Generate an auth token
    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, JWT_SECRETS);
    console.log(authToken);

    // Respond with the created user and auth token
    res.status(201).json({ user, authToken });
  } catch (error) {
    // Log the error and respond with a server error
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route 2: Login user using: POST "/api/auth/login". Doesn't require auth
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Log the request body
    console.log(req.body);

    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate an auth token
    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, JWT_SECRETS);
    console.log(authToken);

    // Respond with the auth token
    res.status(200).json({ authToken });
  } catch (error) {
    // Log the error and respond with a server error
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route 3: Get logged-in user details using: GET "/api/auth/get-user". Auth required
router.post('/get-user', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
