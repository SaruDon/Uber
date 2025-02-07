const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { query } = require('express-validator');
const mapController = require('../controllers/map.controller')
const rideController = require('../controllers/ride.controller')
const {body} = require('express-validator')


router.get('/get-distance-time',
  query('origin')
    .exists()
    .withMessage('Origin is required'),
    query('destination')
    .exists()
    .withMessage('Destination is required'),
  authMiddleware.authUser,mapController.getDistanceTime)

router.get('/get-suggestions',
  query('address').isString().withMessage("Error in Input"),authMiddleware.authUser,mapController.getSuggestionsController)

module.exports = router;