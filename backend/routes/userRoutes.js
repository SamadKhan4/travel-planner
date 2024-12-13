// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const auth = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// @route   POST /api/users/signup
// @desc    Register user
// @access  Public
router.post('/signup', upload.single('profileImage'), userController.signup);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', userController.login);

// @route   GET /api/users/logout
// @desc    Logout user
// @access  Private
router.get('/logout',(req, res,next)=>{
    console.log("logout");
    next();
}, userController.logout);

// @route   GET /api/users
// @desc    Get all users
// @access  Private
router.get('/', auth, userController.getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, userController.getUserById);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', auth, upload.single('profileImage'), userController.updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
