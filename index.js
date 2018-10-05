//this file we use for mongodb db connect
//require('./models/db.connection').open();

//to connect with mongoose.
require('./models/db.conn');
var express = require('express');
var app = express();
var CONFIG = require('./config');
var path = require('path');
//for bodyparser we need to include it.
var bodyParser = require('body-parser');
//adding log4js
const log4js = require('log4js');
log4js.configure('./config/log4js.json')
var startUpLog = log4js.getLogger('startUpLogger')
var accesslog = log4js.getLogger('access')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,x-access-token, Accept");
  next();
});

//for creating log file
try{
  require('fs').mkdirSync('./log');
}catch(error){
  if(error.code != 'EEXIST'){ //here checking file already present or not
    console.error("Could not setup a log directory.",error);
    process.exit(1);
  }
}
app.use(express.static(path.join(__dirname,'public')));

//adding logger to express
app.use(log4js.connectLogger(log4js.getLogger('http'),{level:'auto'}))

app.use(function(req,res,next){
//  console.log("Hit "+req.method+" "+req.url)
accesslog.info("Hit "+req.method+" "+req.url);
next();
})
//we are taking urlencoded data thats why we are using this.in postman you can do this
app.use(bodyParser.urlencoded({extended:false}));

//here in postman with help of body-raw we can choose json,text,xml in which we want to insert data.
app.use(bodyParser.json());




// const homeCtrl = require('./controllers/home.controller');
// const userCtrl = require('./controllers/users.controller');
//
// app.get('/',homeCtrl.home);
// app.get('/user',userCtrl.getUser);
// app.get('/users',userCtrl.getUsers);

const userRoutes = require('./routes/users.routes');
const homeRoutes = require('./routes');
const hotelRoutes = require('./routes/hotel.routes');

app.use('/',homeRoutes);
app.use('/',userRoutes);
app.use('/',hotelRoutes);

console.log(CONFIG);

app.listen(CONFIG.PORT,CONFIG.HOST,function () {
  //it show on terminal
  //console.log('Server is Running by using express',CONFIG.PORT);

  //now this messages will store in log files.will not show on terminal
  startUpLog.info('Server Now WIth Logger on PORT :'+CONFIG.PORT);
  startUpLog.info('Server Now WIth Logger on http://127.0.0.1:'+CONFIG.PORT);
});
