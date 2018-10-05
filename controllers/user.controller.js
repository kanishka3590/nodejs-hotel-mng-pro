var userData  = require('../models/data/users.json');
var dbconn = require('../models/db.connection');
//to access object id we are creating a object.
var ObjectId = require('mongodb').ObjectId;

module.exports.getUsers = function (req,res) {
  // var user = {
  //   name : "John",
  //   age : 20
  // }
  var collection = dbconn.get().db('myHotel').collection('users');
  var offset = 0;
  var count = 4;
  console.log(req.query);
  if(req.query && req.query.offset && req.query.count){
    offset = parseInt(req.query.offset,10);
    count = parseInt(req.query.count,10);
  }
  collection.find({})
  .skip(offset)
  .limit(count)
  .toArray(function(err,doc){
    if(err){
      console.log(err);
      res.status(200)
      .json({
        error:err,
        message:"Unable to fetch record",
      })
    }
    else{
      console.log(doc.length);
      res.status(200)
      .json(doc)
    }
  //connection.close();
  })
}

//module.exports.getUsers = function (req,res) {
  // var users = [
  //   {name : "John",
  //   age : 20},
  //   {name : "Rohn",
  //   age : 21},
  //   {name : "Sohn",
  //   age : 22}
  // ]
  // res
  // .status(200)
  // .json(users)
//}

//POST PUT and all we can check with the help of postman.Write the URL in POSTMAN then check.
module.exports.addUser = (req,res,next)=>{
  var collection = dbconn.get().db('myHotel').collection('users');
  var user = req.body;
  if(req.body && req.body.name && req.body.type && req.body.email && req.body.password){
    collection.insertOne(req.body,function(err,resp){
      res.status(200)
      .json(resp);
  })
}
  else{
    console.log("Please Pass Required Data !");
    res.status(200)
    .json({
      message : "Please Pass Required Data !",
    });
  }
}

module.exports.updateUser = (req,res)=>{
  var collection = dbconn.get().db('myHotel').collection('users');
  var userId = req.params.userId;
  var userData ={$set : {"name":req.body.name , "type":req.body.type, "email":req.body.email, "password":req.body.password}}
  if(userId){
    collection.update({_id:ObjectId(userId)},userData,function(err,user){
    res
    .status(200)
    .json({message:"Update successfully"});
    })
  }
  else{
    res.status(200)
    .json({message:"User Id not Found"});
    }
  // res
  // .status(200)
  // .json({message:'This is a PUT request'});
}

//Get user data with the help of userid
module.exports.getUserData = (req,res,next) =>{
  var userId = req.params.userId;
  console.log(userId);
  if(userId){
    var user = userData[userId];
    console.log(user);
    res.status(200)
    .json(user);
  }
  else{
    res.status(200)
    .json({message:"User Id not Found"});

  }
}
