const rideService = require('../service/ride.service')
const{validationResult} =require('express-validator')
const mapService = require('../service/maps.service')
const {sendMessageToSocketId} = require('../socket')
const rideModel = require('../models/ride.model')
const captainService = require('../service/captain.service')


module.exports.createRide = async(req,res)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({message:errors.array()})
  }
 
  try {

    const{userId ,pickup,destination,vehicleType}= req.body
    const ride = await rideService.createRideService({user:req.user._id,pickup,destination,vehicle:vehicleType})
    const pickupCoordinates = await mapService.getAddressCoordinates(pickup)
    const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates[0],pickupCoordinates[1],500000000)
    
    ride.otp =""

    const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

    

    captainsInRadius.map(captain =>{
      sendMessageToSocketId(captain.socketId,{
        event:'new-ride',
        data:rideWithUser
      });
    })
    console.log('ride', ride)
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

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  
  try {
    // Correct parameter passing: pass rideId string and captain object separately
    const ride = await rideService.confirmRide(
      rideId,       // First parameter: string ID
      req.captain   // Second parameter: captain object
    );


    if (ride?.user?.socketId) {
      console.log('message sent to user ride accepted');
      
      sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-confirmed',
        data: ride
      });
    }

    return res.status(200).json(ride);
  } catch (err) {
    console.error('Controller Error:', err);
    return res.status(500).json({ 
      message: err.message || 'Internal server error' 
    });
  }
};


module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
      const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

if (ride.user.socketId) {
  console.log('ride started message sent to user');
  sendMessageToSocketId(ride.user.socketId, {
    event: 'ride-started',
    data: ride
})

}
      console.log('start-rided', ride)
      return res.status(200).json(ride);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
}

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()})
  }
  const {rideId} = req.body

  try {
    const ride =  await rideService.endRide({rideId,captain:req.captain})
    console.log('ride.fare', ride.fare)
    const fare = ride.fare

    const captain = await captainService.updateCaptainInfo({captain:req.captain,fare})

    console.log('ride.user.socketId', ride.user.socketId)

    if (ride.user.socketId) {
      sendMessageToSocketId(ride.user.socketId,{
        event:"ride-ended",
        data:ride
      })
      console.log('ride ended message sent');     
    }
    
    return res.status(200).json(ride)
  } catch (error) {
    
  }
}