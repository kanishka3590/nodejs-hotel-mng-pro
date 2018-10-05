const mongoose = require('mongoose');

//this whole can be write in single line.
// const Schema = mongoose.Schema;
//
// var hotelSchema = new Schema({
//
// });
//for each schema new id created..
var locationSchema = mongoose.Schema({
  address:String,
  coordinates:[Number]
});

var reviewsSchema = mongoose.Schema({
  name:String,
  id:String,
  review:String,
  rating:Number
});

var roomSchema = mongoose.Schema({
  type:String,
  number:Number,
  description:String,
  photos:[String],
  price:Number
});
var hotelSchema = mongoose.Schema({
  //name:String, //normally we can do this.
  name:{     //here we are making it unique and required.
    type:String,
    required:true,
  //  unique:true
},
  stars:{
    type:Number,
    min:0,
    max:5,
    "default":0  //default keyword is in both java script and mongoose.so it may create problem.
  },
  description:String,
  photos:[String],
  currency:String,
  rooms:[roomSchema], //nested schema.
  location:locationSchema, //nested schema
  reviews:[reviewsSchema], //nested schema
  services:[String]
});

mongoose.model('Hotel',hotelSchema,'hotels');
