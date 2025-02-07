const captainModel = require('../models/captain.model')



module.exports.createCaptain = async ({
  firstname,lastname,email,password,color,plate,capacity,vehicleType
}) =>{
  if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error('All fields are required') 
  }
  const captain = captainModel.create({
    fullname:{
      firstname,
      lastname
    },
    email,
    password,
    vehicle:{
      color,
      plate,
      capacity,
      vehicleType
    }
  })
  return captain
}

module.exports.updateCaptainInfo = async ({ captain, fare }) => {
  try {
    // Increment the 'earning' field by the fare amount.
    console.log('fare', fare)
    const resp = await captainModel.findOneAndUpdate(
      { _id: captain.id },
      { $inc: { earning: fare } },
      { new: true } // Return the updated document.
    );
    console.log('eraing updated', resp)
    return resp;
  } catch (err) {
    throw new Error('Error updating captain info: ' + err.message);
  }
};