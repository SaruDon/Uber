const rideModel = require('../models/ride.model')
const mapService = require('../service/maps.service')
const crypto = require('crypto'); 

function parseDurationToSeconds(formattedDuration) {
    const parts = formattedDuration.split(' ');
    let totalSeconds = 0;
  
    for (const part of parts) {
      if (part.endsWith('d')) {
        totalSeconds += parseInt(part) * 86400; // Days to seconds
      } else if (part.endsWith('h')) {
        totalSeconds += parseInt(part) * 3600; // Hours to seconds
      } else if (part.endsWith('m')) {
        totalSeconds += parseInt(part) * 60; // Minutes to seconds
      } else if (part.endsWith('s')) {
        totalSeconds += parseInt(part); // Seconds
      }
    }
  
    return totalSeconds;
  }

async function getFare(pickup, destination) {
  try {
      // 1. Validate input
      if (!pickup || !destination) {
          throw new Error('Both pickup and destination addresses are required');
      }

      // 2. Get coordinates (with await)
      const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
      const destinationCoordinates = await mapService.getAddressCoordinates(destination);

      console.log('pickupCoordinates', pickupCoordinates)

      const pickupCoordinatesLat = pickupCoordinates[0];
      const pickupCoordinatesLon = pickupCoordinates[1];
      const destinationCoordinatesLat = destinationCoordinates[0];
      const destinationCoordinatesLon = destinationCoordinates[1];


      // Pass coordinates as arrays in the correct order: [longitude, latitude]
      const routeData = await mapService.getDistanceAndTimeService(
        [pickupCoordinatesLat, pickupCoordinatesLon], // Correct order: [longitude, latitude]
        [destinationCoordinatesLat, destinationCoordinatesLon] // Correct order: [longitude, latitude]
      );

      console.log('routeData', routeData)

      const distanceKm = routeData.distance; // Already in kilometers
      const durationInSeconds = parseDurationToSeconds(routeData.duration); // Convert formatted duration to seconds
      const durationMinutes = durationInSeconds / 60; // Convert to minutes
      


      // 6. Fare calculation logic (example rates - adjust accordingly)
      const fareRates = {
          car: {
              base: 40,
              perKm: 12,
              perMin: 2
          },
          bike: {
              base: 20,
              perKm: 8,
              perMin: 1
          },
          auto: {
              base: 30,
              perKm: 10,
              perMin: 1.5
          }
      };

      // 7. Calculate fares
      return {
          car: fareRates.car.base + (distanceKm * fareRates.car.perKm) + (durationMinutes * fareRates.car.perMin),
          bike: fareRates.bike.base + (distanceKm * fareRates.bike.perKm) + (durationMinutes * fareRates.bike.perMin),
          auto: fareRates.auto.base + (distanceKm * fareRates.auto.perKm) + (durationMinutes * fareRates.auto.perMin)
      };

  } catch (error) {
      console.error('Fare calculation error:', error);
      throw new Error(`Could not calculate fare: ${error.message}`);
  }
}


function getOptDigit(num) {
  const min = Math.pow(10, num - 1);
  const max = Math.pow(10, num) - 1;

  // Generate a random number within the specified range
  let otp;
  do {
    const buffer = crypto.randomBytes(num);
    otp = parseInt(buffer.toString('hex'), 16);
  } while (otp < min || otp > max);

  return otp;
}


module.exports.createRideService = async ({user,pickup,destination,vehicle})=>{

    if (!user || !pickup || !destination || !vehicle) {
        throw new Error("All fields must be filled out");
      }
   const fare = await getFare(pickup, destination)
   const ride = rideModel.create({
    user,
    pickup,
    destination,
    fare:fare[vehicle],
    otp: getOptDigit(4)
   })

   return ride
}
 
module.exports.getFareService = async (pickup,destination) => {
   return await getFare(pickup,destination)
}


module.exports.confirmRide = async (rideId, captain) => {
  // Validate parameters
  if (!rideId) throw new Error('Ride ID is required');
  if (!captain?._id) throw new Error('Captain information is incomplete');

  try {
    // Update ride with proper ID usage
    const updatedRide = await rideModel.findOneAndUpdate(
      { _id: rideId },  // Correct ID usage
      { 
        status: 'accepted',
        captain: captain._id 
      },
      { new: true }  // Return updated document
    ).populate('user').populate('captain').populate('otp');

    console.log('Ride accepted updatedRide', updatedRide)

    if (!updatedRide) {
      throw new Error('Ride not found');
    }

    return updatedRide;
  } catch (error) {
    console.error('Service Error:', error);
    throw error;  // Re-throw for controller to handle
  }
};


module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
      throw new Error('Ride id and OTP are required');
  }

  const ride = await rideModel.findOne({
      _id: rideId
  }).populate('user').populate('captain').select('+otp');


  if (!ride) {
      throw new Error('Ride not found');
  }

  if (ride.status !== 'accepted') {  
      throw new Error('Ride not accepted');
  }

  const parsedOtp = parseInt(otp, 10);
  if (ride.otp !== parsedOtp) { // Now both are numbers
    console.log('ride.otp (type)', typeof ride.otp, ride.otp);
    console.log('parsedOtp (type)', typeof parsedOtp, parsedOtp);
    throw new Error('Invalid OTP');
  }

  await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'ongoing'
  })

  return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
      console.log('rideId Not present');{
        
      }
      throw new Error('Ride id is required');{}
  }

  const ride = await rideModel.findOne({
      _id: rideId,
      captain: captain._id
  }).populate('user').populate('captain').select('+otp');
  console.log('rideEnd', ride)
  if (!ride) {
      throw new Error('Ride not found');
  }

  if (ride.status !== 'ongoing') {
    console.log('rideStaus', rideStaus)
      throw new Error('Ride not ongoing');
  }

  const resp = await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'completed'
  })
  console.log('rideEnd status updated to completed', resp)

  return ride;
}
