const HOST = '127.0.0.1';
const PORT = 3000;
//this is to connect with help of mongodb.everytime ip will change.
//const DBURL = 'mongodb://rootUser:password@192.168.1.17:27017/myHotel';

//this is to connect with help of mongoose.
const DBURL = 'mongodb://192.168.1.38:27017/myHotel';
const authSource = 'admin';
const DbUsr = 'rootUser';
const DbPwd = "password";

const secreateKey = 'KanishkaBhardwajLearning';
module.exports = {
  HOST:HOST,
  PORT:PORT,
  DBURL:DBURL,
  AUTHSRC:authSource,
  DBUSR:DbUsr,
  DBPWD:DbPwd,
  SCREATEKEY:secreateKey
}
