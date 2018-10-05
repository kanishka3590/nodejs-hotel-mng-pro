//with the help of mongoose all operations have done. all data with mongodb copied in hotel.controller file.
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.getHotelsData = (req,res,next)=>{
    var offset = 0;
    var count = 4;
    console.log(req.query);
    if(req.query && req.query.offset && req.query.count){
      offset = parseInt(req.query.offset,10);
      count = parseInt(req.query.count,10);
    }
  Hotel.find()
  .skip(offset)
  .limit(count)
  .exec(function(err,doc){
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

  var hotelId = req.params.hotelId;
  console.log(hotelId);
  if(hotelId){
    Hotel.findById(hotelId).exec(function(err,hotel){
      res.status(200)
      .json(hotel);
    })

  }
  else{
    res.status(200)
    .json({message:"Hotel Id not Found"});

  }
}
//reviews by hotel id
module.exports.getHotelReviews = (req,res,next) =>{

  var hotelId = req.params.hotelId;
  console.log(hotelId);
  if(hotelId){
    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err,reviews){
      if(err){
        res.status(400).json({message:"Not Found"})
      }
      res.status(200)
      .json(reviews);
    })

  }
  else{
    res.status(200)
    .json({message:"Hotel Id not Found"});

  }
}

//review by review id
module.exports.getHotelOneReviews = (req,res,next) =>{
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log(hotelId);
  if(hotelId){
    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err,reviewsHotel){
      if(err){
        res.status(400).json({message:"Not Found"})
      }
      var review = reviewsHotel.reviews.id(reviewId);
      res.status(200)
      .json(review);
    })

  }
  else{
    res.status(200)
    .json({message:"Hotel Id not Found"});

  }
}  //for parallel query we are using async
  async function getReviews(hotelId){
      if(!hotelId){
        throw new Error("Hotel Id Not Found");
      }
    var reviewobj = await Hotel.findById(hotelId).select("reviews");
    return reviewobj;
  }


//adding new reviews with help of find and update menthod
module.exports.addHotelReviews = (req,res,next) =>{
  var hotelId = req.params.hotelId;
  console.log(hotelId);
  getReviews(hotelId).then((reviews)=>{
    var newR = reviews.reviews.push(req.body);
   var newReview = {$set:{'reviews':reviews.reviews}}
//  if(hotelId){
    //if we want to change only name of review.nested document
    //"review.0.name":"req.body.name"
//    var newReview = {$set:{'reviews':[req.body]}}
    Hotel.findByIdAndUpdate(hotelId,newReview,function(err,doc){
      if(err){
        res.status(500).json({message:"Reviews Not Added"})
      }
      res.status(200)
      .json(doc);
    })
})
  //}

}


//Adding new hotel with request body.
module.exports.addHotelNew = (req,res,next) =>{
  //var hotel = req.body;

    //Hotel.create(req.body,function(err,doc))
//two methods to insert into db.here in backend we have also given some field as required
//and we are also given 3 fiels required.,nd in schema we alse have given some fields required.
    if(req.body && req.body.name && req.body.stars && req.body.description){
      var hotel = new Hotel(req.body);
      hotel.save(function(err,resp){
      if(err){
      res.status(200)
      .json({message:"Insertion Failed!"});}
      else{
        res.status(200)
        .json(resp)
      }
  })
}
  else{
    res.status(200)
    .json({
      message : "Please Pass Required Data !",
    });
  }
}

//update hotel name or whole data or nested data.
module.exports.updateHotel = (req,res,next) =>{
  var hotelId = req.params.hotelId;
  var hotelData ={$set : req.body}
  if(hotelId){
    Hotel.findOneAndUpdate({_id:hotelId},hotelData,function(err,hotel){
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

//delete hotel by id
module.exports.deleteHotel = (req,res,next) =>{
  var hotelId = req.params.hotelId;
  console.log(hotelId);
    if(hotelId){
    Hotel.findByIdAndRemove({_id:hotelId},function(err,hotel){
      res.status(200)
      .json({message : "Data Deleted"});
    })

  }
  else{
    res.status(200)
    .json({message:"Hotel Id not Found"});

  }
}

//delete review by review id.
module.exports.deleteReview = (req,res,next) =>{
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;

  console.log(hotelId);
    if(hotelId){
      Hotel
      .findById(hotelId)
      .select('reviews')
      .exec(function(err,reviewsHotel){
        if(err){
          res.status(400).json({message:"Review Id Not Found"})
        }
        var review = reviewsHotel.reviews.id(reviewId);
        res.status(200)
        .json(review);
      })

    }
  else{
    res.status(200)
    .json({message:"Hotel Id not Found"});

  }
}

//book hotel
module.exports.bookHotel = (req,res,next) =>{
  // var hotelId = req.params.hotelId;
  // console.log(hotelId);
  // Hotel.findById(hotelId).exec(function(err,hotel){
  //   res.status(200)
  //   .json(hotel);
  // })
  //
  // }
  // else{
  //   res.status(200)
  //   .json({message:"Hotel Id not Found"});
  //
  // }
}
