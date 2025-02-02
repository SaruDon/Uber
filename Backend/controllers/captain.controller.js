const captainModel = require("../models/captain.model");

const captainService = require("../service/captain.service");
const blacklistTokenModel = require('../models/blacklistToken.model')
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptain = await captainModel.findOne({email})
    if (isCaptain) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    console.log('password hashed');
    
    

    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    console.log('captain created!');
    

    const token = captain.generateAuthToken();

    console.log("Sending response...");
    return res.status(201).json({ token, captain });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports.loginCaptain =async (req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array()});
  }

  console.log(req.body);

  const {email,password} = req.body

  const captain = await captainModel.findOne({email}).select('+password')

  if(!captain){
    return res.status(401).json({message:'Email not found'})
  }

  const isMatch = await captain.comparePassword(password);

  if(!isMatch){
    return res.status(401).json({message:'Inavalid Email'})
  }

  const token = captain.generateAuthToken();

  res.cookie('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    maxAge:3600000
  })

  res.status(200).json({token,captain});
}

module.exports.getCaptainProfile =async(req,res,next) =>{
  res.status(200).json(req.captain)
}

module.exports.logoutCaptain = async(req,res,next)=>{
  res.clearCookie('token');
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  await blacklistTokenModel.create({token});
  res.status(200).json({message:'Logged Out'})
}
