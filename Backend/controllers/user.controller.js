const userModel = require('../models/user.model');
const userService = require('../service/user.service')
const {validationResult} = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("Request body:", req.body);

    const { fullname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    console.log("Hashing password...");
    const hashedPassword = await userModel.hashPassword(password);

    console.log("Creating user...");
    const user = await userModel.create({
      fullname: {
        firstName: fullname.firstname,
        lastName: fullname.lastname,
      },
      email,
      password: hashedPassword,
    });

    console.log("Generating token...");
    const token = user.generateAuthToken();

    console.log("Sending response...");
    return res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports.loginUser = async(req,res,next) =>{  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array()});
  }

  console.log(req.body);

  const {email,password} = req.body

  const user = await userModel.findOne({email}).select('+password')

  console.log('user', user)
  if(!user){
    return res.status(401).json({message:'Email not found'})
  }

  const isMatch = await user.comparePassword(password);
  console.log('isMatch', isMatch)

  if(!isMatch){
    return res.status(401).json({message:'Inavalid Email'})
  }

  const token = user.generateAuthToken();

  res.cookie('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    maxAge:3600000
  })

  res.status(200).json({token,user});
}

module.exports.getUserProfile = async(req,res,next) =>{
  res.status(200).json(req.user)
}

module.exports.logOutUser = async (req, res, next) => {
  try {
    // Clear the token cookie
    res.clearCookie('token');

    // Extract token from cookies or authorization header
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(400).json({ message: 'Token not provided' });
    }

    // Add the token to the blacklist
    const blToken = await blacklistTokenModel.create({ token });
    console.log('Blacklisted Token:', blToken);

    // Send success response
    return res.status(200).json({ message: 'Logged Out' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'An error occurred during logout', error: error.message });
  }
};
