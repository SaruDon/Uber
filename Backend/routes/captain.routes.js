const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const captainController = require('../controllers/captain.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.post(
  '/register',
  [
    // Fullname validation
    body('fullname.firstname')
      .notEmpty()
      .withMessage('First name is required')
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname')
      .optional()
      .isLength({ min: 3 })
      .withMessage('Last name must be at least 3 characters long'),

    // Email validation
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please enter a valid email address'),

    // Password validation
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),

    // Vehicle validation
    body('vehicle.color')
      .notEmpty()
      .withMessage('Vehicle color is required')
      .isLength({ min: 3 })
      .withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate')
      .notEmpty()
      .withMessage('Vehicle plate is required')
      .isLength({ min: 3 })
      .withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity')
      .notEmpty()
      .withMessage('Vehicle capacity is required')
      .isInt({ min: 1 })
      .withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType')
      .notEmpty()
      .withMessage('Vehicle type is required')
      .isIn(['car', 'suv', 'motorcycle', 'auto', 'bus'])
      .withMessage('Vehicle type must be one of: car, suv, motorcycle, auto, or bus'),

    // Location validation
  ],
  captainController.registerCaptain // Controller method
);


router.post('/login',[
  body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please enter a valid email address'),

    // Password validation
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
],captainController.loginCaptain);


router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;