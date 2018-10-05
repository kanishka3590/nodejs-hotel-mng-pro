const express = require('express');
var router = express.Router();

const hotelCtrl = require('../controllers/hotels.controller');
const authCtrl = require('../controllers/auth.controller');

//router to see all hotels data.
router
.route('/hotels')
.get(authCtrl.validateToken,hotelCtrl.getHotelsData); //now hotel will show only with validate users.

//router to see one hotel with hotelId.
router
.route('/hotels/:hotelId')
.get(hotelCtrl.getHotelData);

//reviews by review id
router
.route('/hotels/:hotelId/reviews/:reviewId')
.get(hotelCtrl.getHotelOneReviews)


//reviews by hotel id
router
.route('/hotels/:hotelId/reviews')
.get(hotelCtrl.getHotelReviews)
.put(hotelCtrl.addHotelReviews);



//router for adding new hotel.
router
.route('/hotels/new')
.post(hotelCtrl.addHotelNew);

//router for deleting data field.
router
.route('/hotels/delete/:hotelId')
.get(hotelCtrl.deleteHotel);

router
.route('/hotels/update/:hotelId')
.post(hotelCtrl.updateHotel);

router
.route('/bookhotel')
.get(hotelCtrl.bookHotel);


module.exports=router;
