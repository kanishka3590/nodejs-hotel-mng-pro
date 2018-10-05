const MongoClient = require('mongodb').MongoClient;
const CONFIG = require('../config');
//mongodb url.if we have installed mongodb in localhost then will give mongodb://localhost.but we have installed in
//vagrant then we are giving this ip 192.168.1.29.this is came from vagrant ssh command details.
//we make db authenticate thats why have to give all detail in starting.
// const dbUrl = 'mongodb://appAdmin:password@192.168.1.29:27017/';
var connection = null;
function open() {
  MongoClient.connect(CONFIG.DBURL,{authSource:CONFIG.AUTHSRC},
    function(error,client){
    if(error){
      console.log('Error in db connection!');
    }
    else {
      connection = client;
      console.log('Connection successful');
    }
  })
}
function get() {
  return connection;
}
//console.log(process);
//event handler //here we are closing connection
//SIGINT for if there is keyboard intruption
// process.on("SIGINT",()=>{
//   console.log("Server Termination due to (SIGINT)");
//   connection.close();
//   process.exit(0);
// });
//
// //SIGTERM is for if process intruption
// process.on("SIGTERM",()=>{
//   console.log("Server Termination due to (SIGTERM)");
//   connection.close();
//   process.exit(0);
// });
//
// //SIGUSR2 is for user define signals.
// process.once("SIGUSR2",()=>{
//   console.log("Server Termination due to (SIGUSR2)");
//   connection.close();
//   process.exit(0);
// });
//

module.exports = {
  open : open,
  get : get,
}
