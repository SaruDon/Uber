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


      const pickupCoordinatesLat = pickupCoordinates[0].location[0];
      const pickupCoordinatesLon = pickupCoordinates[0].location[1];
      const destinationCoordinatesLat = destinationCoordinates[0].location[0];
      const destinationCoordinatesLon = destinationCoordinates[0].location[1];

      // Pass coordinates as arrays in the correct order: [longitude, latitude]
      const routeData = await mapService.getDistanceAndTimeService(
        [pickupCoordinatesLat, pickupCoordinatesLon], // Correct order: [longitude, latitude]
        [destinationCoordinatesLat, destinationCoordinatesLon] // Correct order: [longitude, latitude]
      );


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
    console.log('user', user)
    console.log('pickup', pickup)
    console.log('destination', destination)
    console.log('vehicle', vehicle)
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

