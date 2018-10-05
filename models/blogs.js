const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var blogSchema =new  Schema({
  title:String,
  author:String,
  details:[{head:String,body:String,imagepath:String}],
  date:Date,
  reviews:String,
  rating:Number
});
//first is model object,second is schema,collection name.
var Blog = mongoose.model('Blog',blogSchema,'holtels');
