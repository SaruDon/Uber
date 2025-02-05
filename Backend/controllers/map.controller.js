const mapService = require('../service/maps.service');
const {validationResult} = require('express-validator')

module.exports.getCoordinates = async (req, res, next) => {
  const  errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({message:errors.array()})
  }
  const { address } = req.query;
  console.log('address', address)
  
  if (!address) {
    return next({ status: 400, message: 'Address is required' });
  }

  try {
    const coordinates = await mapService.getAddressCoordinates(address);
    const latitude= coordinates[0].location[0];
    const longitude =coordinates[0].location[1]
    res.status(200).json({latitude,longitude});
  } catch (error) {
    console.log('error.res', error)
    res.status(404).json({message:'Coordinate not found'});
  }
};

module.exports.getSuggestionsController =async (req,res, next)=>{
  const  errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('Erorr')
    return res.status(400).json({message:errors.array()})
  }
  const { address } = req.query;
  console.log('address', address)
  
  if (!address) {
    return next({ status: 400, message: 'Address is required' });
  }

  try {
    const locations = await mapService.getAddressCoordinates(address);
    res.status(200).json(locations);
  } catch (error) {
    console.log('error.res', error)
    res.status(404).json({message:'Coordinate not found'});
  }
}

module.exports.getDistanceTime = async (req, res, next) => {
  // Validate request parameters using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

try {
  console.log('req.query', req.query);

  // Parse the origin and destination coordinates as JSON strings first
  const parsedOrigin = JSON.parse(req.query.origin);
  const parsedDestination = JSON.parse(req.query.destination);
  console.log('parsedOrigin', parsedOrigin);
  console.log('parsedDestination', parsedDestination);

  const resp = await mapService.getDistanceAndTimeService(parsedOrigin, parsedDestination);
  console.log('resp', resp);
  const distanceAndTime = resp;
  console.log('distanceAndTime', distanceAndTime);
  return res.status(200).json(distanceAndTime);
} catch (error) {
  console.error('Controller Error:', error.message);
  return res.status(500).json({ error: error.message });
} 
};
// {
//   "origin":[
//   73.854449,
//   18.52159
// ],
// "destination":[
//   72.970458,
//   19.194263
// ]
// }