var hotelData  = require('../models/data/hotel-data.json');
var dbconn = require('../models/db.connection');
//to access object id we are creating a object.
var ObjectId = require('mongodb').ObjectId;

module.exports.getHotelsData = (req,res,next)=>{
  var connection = dbconn.get();
  var db = connection.db('myHotel');
  var collection = db.collection('hotels');

  //in one line we can write this like this
//  var collection = dbconn.get().db('myHotel').collection('hotels');

  //Here we are limit the whole data with the help of slice method.
    var offset = 0;
    var count = 4;
    console.log(req.query);
    if(req.query && req.query.offset && req.query.count){
      offset = parseInt(req.query.offset,10);
      count = parseInt(req.query.count,10);
    }
    //console.log("Get Hotel JSON data");
    // var newData = hotelData.slice(offset,offset+count);
    // console.log(newData.length);
    // res.status(200)
    // .json(newData);


//Here we are fetching data from database.creating connection object and access the collection.
//
//or we can create connection only once.
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

//Here for one hotel with the help of hotelId.index is passed with param./hotel/index
module.exports.getHotelData = (req,res,next) =>{
  var connection = dbconn.get();
  var db = connection.db('myHotel');
  var collection = db.collection('hotels');


//  var collection = dbconn.get().db('myHotel').collection('hotels');
  var hotelId = req.params.hotelId;
  console.log(hotelId);
  if(hotelId){
    collection.findOne({_id:ObjectId(hotelId)},function(err,hotel){
      res.status(200)
      .json(hotel);
    })
    // var hotel = hotelData[hotelId];
    // console.log(hotel);

  }
  else{
    res.status(200)
    .json({message:"Hotel Id not Found"});

  }
}

//Adding new hotel with request body
module.exports.addHotelNew = (req,res,next) =>{
  var connection = dbconn.get();
  var db = connection.db('myHotel');
  var collection = db.collection('hotels');

//  var collection = dbconn.get().db('myHotel').collection('hotels');
  var hotel = req.body;
  if(req.body && req.body.name && req.body.stars && req.body.description){
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

module.exports.deleteHotel = (req,res,next) =>{
  var connection = dbconn.get();
  var db = connection.db('myHotel');
  var collection = db.collection('hotels');

//  var collection = dbconn.get().db('myHotel').collection('hotels');
  var hotelId = req.params.hotelId;
  console.log(hotelId);
    if(hotelId){
    collection.deleteOne({_id:ObjectId(hotelId)},function(err,hotel){
      res.status(200)
      .json({message : "Data Deleted"});
    })

  }
  else{
    res.status(200)
    .json({message:"Hotel Id not Found"});

  }
}

module.exports.updateHotel = (req,res,next) =>{
  var collection = dbconn.get().db('myHotel').collection('hotels');
  var hotelId = req.params.hotelId;
  var hotelData ={$set : {"name":req.body.name , "star":req.body.star, "description":req.body.description}}
  if(hotelId){
    collection.update({_id:ObjectId(hotelId)},hotelData,function(err,hotel){
    res
    .status(200)
    .json({message:"Update successfully"});
    })

  }
  else{
    res.status(200)
    .json({message:"Hotel Id not Found"});
    }
}
