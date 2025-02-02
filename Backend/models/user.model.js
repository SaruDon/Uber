const mongoose = require('mongoose');
const brcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  fullname:{
    firstName:{
      type:String,
      require:true,
      minLength:[3,'first name should be min 3 character'],
    },
    lasttName:{
      type:String,
      minLength:[3,'first name should be min 3 character'],
    }
  },
  email:{
    type:String,
    required:true,
    unique: true,
    minLength:[5,'email must me 5 character long']
  },
  password:{
    type:String,
    required:true,
    select:false
  },
  // socketId:{
  //   type:String
  // }
})


userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
  return token
}

userSchema.methods.comparePassword = async function(password){
  return await brcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
  return await brcrypt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;