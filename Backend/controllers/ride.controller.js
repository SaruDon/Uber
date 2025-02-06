const rideService = require('../service/ride.service')
const{validationResult} =require('express-validator')
const mapService = require('../service/maps.service')
const {sendMessageToSocketId} = require('../socket')
const rideModel = require('../models/ride.model')

module.exports.createRide = async(req,res)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({message:errors.array()})
  }
 
  try {

    const{userId ,pickup,destination,vehicleType}= req.body
    console.log('req.body', req.body)
    const ride = await rideService.createRideService({user:req.user._id,pickup,destination,vehicle:vehicleType})
    console.log('ride', ride)
    const pickupCoordinates = await mapService.getAddressCoordinates(pickup)
    console.log('pickupCoordinates', pickupCoordinates[0])
    const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates[0],pickupCoordinates[1],500000000)
    
    ride.otp =""

    const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');


    captainsInRadius.map(captain =>{
      sendMessageToSocketId(captain.socketId,{
        event:'new-ride',
        data:rideWithUser
      });
    })

    console.log('captainsInRadius', captainsInRadius)
    return res.status(200).json(ride)
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}


module.exports.getFare = async(req, res)=>{
  try {
    console.log('req.body', req.query)
    const{pickup, destination}= req.query
    console.log('pickup', pickup)
    console.log('destination', destination)
    const resp = await rideService.getFareService(pickup, destination)
    console.log('resp', resp)
    return res.status(200).json(resp)
  } catch (error) {
    res.status(400).json({messages:error.message})
  }
}