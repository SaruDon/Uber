const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const rideController = require('../controllers/ride.controller')
const {query} = require('express-validator')
const {body} = require('express-validator')


module.exports= router;


router.post('/create',authMiddleware.authUser,
  body('pickup').isString().isLength({min:3}).withMessage('Invalid user'),
  body('destination').isString().isLength({min:3}).withMessage('Invalid user'),
  body('vehicleType').isString().isIn(['car', 'suv', 'bike', 'auto', 'bus']).withMessage('Select vehicle type')
  ,rideController.createRide
)

router.get('/get-fare',
  query('pickup').isString().isLength({min:3}).withMessage('Invalid user'),
  query('destination').isString().isLength({min:3}).withMessage('Invalid user'),
  authMiddleware.authUser,rideController.getFare
)