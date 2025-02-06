const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    require:true
  },
  captain:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'captain',
  },
  pickup:{
    type:String,
    require:true
  },
  destination:{
    type:String,
    require:true
  },
  fare:{
    type:Number,
    require:true
  },
  status:{
    type:String,
    enum:['pending','accepted','completed','ongoing','completed','canceled'],//compltete this
    default:'pending'
  },
  duration:{
    type:Number
  }, // in sec
  distance:{
    type:Number
  },//in meters
  paymentId:{
    type:String
  },
  orderId:{
    type:String
  },
  signature:{
    type:String
  },
  otp:{
    type:Number,
    select:false,
    require:true
  }
})

module.exports = mongoose.model('ride',rideSchema);