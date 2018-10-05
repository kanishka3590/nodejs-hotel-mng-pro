//we have create this file to create connection with the help of mongoos.
const mongoose = require('mongoose');
const CONFIG = require('../config');
require('./hotels.model'); //adding schema.
require('./users.model');
const options={
  user:CONFIG.DBUSR,
  pass:CONFIG.DBPWD,
  authSource:CONFIG.AUTHSRC,
  useNewUrlParser: true
}
mongoose.connect(CONFIG.DBURL,options);
var _conn = mongoose.connection;
//console.log(_conn);
//on event always trigger.once event only one time.
_conn.on('error',function(error){
  console.error('Connection fail to db!',error);
});
_conn.once('open',function(){
  console.log('Mongoose Connection successful!');
})


function gracefullShutdown(signal,callback){
  _conn.close(()=>{
    console.log(`Server Termination due to ${signal} in Mongoose`);
  });
}

process.on("SIGINT",()=>{
  gracefullShutdown('SIGINT',function(){
    process.exit(0);
  })
});

//SIGTERM is for if process intruption
process.once("SIGTERM",()=>{
  gracefullShutdown('SIGTERM',function(){
    process.exit(0);
  })
});

//SIGUSR2 is for user define signals.
process.once("SIGUSR2",()=>{
  gracefullShutdown('SIGUSR2',function(){
    process.kill(process.pid,'SIGUSR2');
  })
});
