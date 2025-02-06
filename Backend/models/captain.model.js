const mongoose = require('mongoose')
const brcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const captainSchema = new mongoose.Schema({
  fullname:{
    firstname:{
      type:String,
      required:true,
      minLength:[3,'FirstName must be 3 char']
    },lastname:{
      type:String,
      minLength:[3,'FirstName must be 3 char']
    }
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address'
    ],
  },
  password:{
    type:String,
    required:true,
    select:false
  },
  socketId:{
    type:String
  },
  status:{
    type:String,
    enum:['active','inactive'],
    default:'inactive'
  },
  vehicle:{
    color:{
      type:String,
      required:true,
      minLength:[3,'Color must be 3 char long']
    },
    plate:{
      type:String,
      required:true,
      minLength:[3,'Plate must be 3 Char long']
    },
    capacity:{
      type:Number,
      required:true,
      min:[1,'Capacity must be at least 1']
    },
    vehicleType:{
      type:String,
      required:true,
      enum: ['car', 'suv', 'bike', 'auto', 'bus']
    }
  },
  location:{
    ltd:{
      type:Number,
     required:false,
    },
    lng:{
      type:Number,
      required:false,
    },
  }
})


captainSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
  return token
}

captainSchema.methods.comparePassword = async function(password){
  return await brcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
  return await brcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain',captainSchema);


module.exports = captainModel