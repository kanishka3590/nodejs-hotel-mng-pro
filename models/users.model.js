const mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  //  unique:true
},
  role:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  address:[String],
  phoneNumber:String,
  activeStatus:
  {
    type:Boolean,
    "default":false
  },
  gender:
  {
    type:String,
    "default":"male"
  },
  regDate:
  {
    type:Date,
    "default":Date.now
  },
  lastDate:
  {
    type:Date,
    "default":Date.now
  }
});

mongoose.model('User',userSchema,'users');
