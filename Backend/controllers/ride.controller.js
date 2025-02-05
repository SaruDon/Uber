const rideService = require('../service/ride.service')
const{validationResult} =require('express-validator')


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
    return res.status(200).json(ride)
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}