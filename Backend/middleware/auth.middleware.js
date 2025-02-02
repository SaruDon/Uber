const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies.token || (authHeader && authHeader.startsWith('Bearer ') && authHeader.split(' ')[1]);

  console.log('Received Token:', token);

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Check if the token is blacklisted i.e person is logged out 
  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  console.log('Token Blacklisted:', isBlacklisted);

  if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
  }

  try {
      console.log('Verifying Token:', token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }); // to get Id of user from jwt token after decoding token
      console.log('Decoded Token:', decoded);

      const user = await userModel.findById(decoded._id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      req.user = user;
      return next();

  } catch (err) {
      console.error('JWT Verification Error:', err.message);
      return res.status(401).json({ message: `Unauthorized: ${err.message}` });
  }
};


module.exports.authCaptain = async(req,res,next)=>{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({message:'no token'})
  }

  const isblacklistToken = await blacklistTokenModel.findOne({token:token})

  if (isblacklistToken) {
    return res.status(401).json({message:'Unauthorized'})
  }

  try{
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    const captain = await captainModel.findById(decode._id)

    req.captain = captain
    return next()
  }catch(err){
    return res.status(401).json({message:'Unauthorized request'})
  }
}