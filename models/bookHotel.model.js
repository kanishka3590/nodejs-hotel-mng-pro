const mongoose = require('mongoose');
var bookHotelSchema = mongoose.Schema({
  hotelId : ObjectId,
  userId : ObjectId
})

mongoose.model('Book',bookHotelSchema,'users');
