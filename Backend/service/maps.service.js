const axios = require('axios');
const captainModel = require('../models/captain.model')

module.exports.getAddressCoordinates = async (address) => {
  try {
    const responseNominatim = await axios.get(process.env.NOMINATIM_URL, {
      params: {
        q: address,
        format: 'json',
        limit: 1
      }
    });

    if (responseNominatim.data.length === 0) {
      throw new Error('Address not found');
    }

    // Extract latitude and longitude as numbers
    const lat = parseFloat(responseNominatim.data[0].lat);
    const lon = parseFloat(responseNominatim.data[0].lon);

    // Return in the format [longitude, latitude]
    return [lon, lat];
  } catch (error) {
    console.error('Error in getAddressCoordinates:', error.message);
    throw error;
  }
};

module.exports.getAddress = async (address) => {
  try {
    // Step 1: Use Nominatim to get the latitude and longitude of the address
    const responseNominatim = await axios.get(process.env.NOMINATIM_URL, {
      params: {
        q: address,
        format: 'json',
        limit: 1 // Limit to 1 result
      }
    });

    if (responseNominatim.data.length === 0) {
      throw new Error('Address not found');
    }

    const lat = responseNominatim.data[0].lat;
    const lon = responseNominatim.data[0].lon;


    // Step 2: Use OSRM to get the snapped coordinate to the nearest road
    const responseOSRM = await axios.get(`${process.env.OSRM_NEAREST_URL}/${lon},${lat}`, {
      params: {
        number: 5 // Return only the nearest match
      }
    });

    if (responseOSRM.data.code !== 'Ok') {
      throw new Error('Unable to snap coordinate to the nearest road');
    }
    // Extract the snapped coordinate from the OSRM response
    const suggestedNames = responseOSRM.data.waypoints.map(waypoint => waypoint.name);
    return suggestedNames;
  } catch (error) {
    console.error('Error in :', error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
};



module.exports.getDistanceAndTimeService = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("origin or destination is empty");
  }
  try {
    const [originLon, originLat] = origin; // Ensure correct order (longitude first)
    const [destinationLon, destinationLat] = destination;

    console.log('originLon', originLon);
    console.log('originLat', originLat);
    console.log('destinationLon', destinationLon);
    console.log('destinationLat', destinationLat);

    const response = await axios.get(
      `${process.env.OSRM_ROUTE_URL}/${originLon},${originLat};${destinationLon},${destinationLat}`,
      {
        params: {
          overview: 'false'
        }
      }
    );

    if (response.data.code !== 'Ok') {
      throw new Error(response.data.message || 'Routing error');
    }
    const route = response.data.routes[0];

   

    const durationInSeconds = Math.floor(route.duration); // Assuming route.duration is in seconds

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(durationInSeconds / 86400); // There are 86400 seconds in a day
    const remainingSeconds = durationInSeconds % 86400;
    const hours = Math.floor(remainingSeconds / 3600);
    const remainingSeconds2 = remainingSeconds % 3600;
    const minutes = Math.floor(remainingSeconds2 / 60);
    const seconds = remainingSeconds2 % 60;

    // Format the duration in DD:HH:MM:SS format
    const formattedDuration = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    const distance = route.distance / 1000;
    console.log('**distance', distance);
    console.log('**duration', formattedDuration);
    return { duration: formattedDuration, distance };
  } catch (error) {
    console.error('OSRM API Error:', error.response?.data?.message || "OSRM API error");
    throw new Error(error.response?.data?.message || "OSRM API error");
  }
};


module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

  // radius in km


  const captains = await captainModel.find({
      location: {
          $geoWithin: {
              $centerSphere: [ [ ltd, lng ], radius / 6371 ]
          }
      }
  });

  console.log('captainsModel', captains)

  return captains;


}