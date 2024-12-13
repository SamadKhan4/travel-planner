// controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle profile image
    let profileImage = 'default.png';
    if (req.file) {
      profileImage = req.file.filename;
    }

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      profileImage,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log(email, password);

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials (email)' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials (password)' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    // Send user data
    res.json({
      name: user.name,
      profileImage: `/uploads/profileImages/${user.profileImage}`,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Logout Controller
exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get All Users (CRUD Read)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get Single User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Build user object
    let userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      userFields.password = await bcrypt.hash(password, salt);
    }

    // Handle profile image
    if (req.file) {
      userFields.profileImage = req.file.filename;
    }

    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select('-password');

    res.json(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.findByIdAndRemove(req.params.id);

    res.json({ message: 'User removed' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
