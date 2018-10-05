const mongoose = require('mongoose');
var User = mongoose.model('User');
const bcrypt = require('bcrypt'); //we dnt give password in normal form.to encrypt it we are using.
const jwt = require('jsonwebtoken');//this is for token.
const CONFIG = require('../config');

//for saving log.
const log4js = require('log4js');
log4js.configure('./config/log4js.json')
var userlog = log4js.getLogger('user');
var accesslog = log4js.getLogger('access');
var errorlog = log4js.getLogger('error')

module.exports.registration = (req,res,next)=>{
  console.log(req.body);
  accesslog.info("Registration Hit/register");
  if(req.body && req.body.name && req.body.password && req.body.email)
  {
  //only for password we are using this.
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var hashPassword = bcrypt.hashSync(req.body.password,salt);
// var newUser = new User(req.body);
//we can map it one by one field
  var newUser = new User({
    name:req.body.name,
    email:req.body.email,
    password:hashPassword,
    role:req.body.role,
    phoneNumber:req.body.phoneNumber
  });
  newUser.save(function(err,user){
    if(err){
      res.status(500).json({
          payLoad:{error:err,message:"Failed to Register !!"}
        })
        errorlog.error({error:err,message:"Failed to Register !!"})
    }else{
      //we are generating token to autologin everytime.not mendatory in normal login logic.
      //jwt.sign(Payload,Signature Key,[]) //bu default algo is HS256
      var token = jwt.sign({_id:user._id},CONFIG.SCREATEKEY,{expiresIn:43200}) //it generate token.
      res.status(200).json({
        payLoad:
        {
        message:"Registration Successful !!",
        auth:true,
        token:token
      }})
    }
  })}else{
    res.status(404)
    .json({message:"Please Enter Required fields !!"});
  }
}
module.exports.login=(req,res,next)=>{
  if(!req.body.email || !req.body.password){
    res.status(400)
    .json({payLoad:{message:"Email and Password Can't be Empty !!",auth:false}});
  }else{
    User.findOne({email:req.body.email},function(err,user){
      if(err){
        res.status(400)
        .json({payLoad:{message:"Internal Server Error!!",auth:false}})
      }
      else{
        if(!user){
          res.status(400)
          .json({payLoad:{message:"User Do Not Exists !!",auth:false}});
          }else{
          //we are decrypting db password with the password we are entering.
          var isPwd = bcrypt.compareSync(req.body.password,user.password);
          if(!isPwd){
            res.status(200).json({
              payload:{
                message:"Password Not Match",
                auth:false
                }
            });
          }else{
            var token = jwt.sign({_id:user._id},CONFIG.SCREATEKEY,{expiresIn:43200})
            res.status(200).json({
                payload:{
                message:"User Found, Login Successful !!",
                auth:true,
                token:token
                }
            });
            userlog.info("User is registered with token ",token);
          }
        }
      }
})
}}

//to validate token.inside postman, In header part we have pasted last token.
module.exports.validateToken=(req,res,next)=>{
  var token = req.headers['x-access-token'];
  if(!token){
    res.status(404).json({
      payload:{
        auth:false,
        message:"Token Not Found !!",
        token:null
      }
    })
  }else{
    jwt.verify(token,CONFIG.SCREATEKEY,function(err,doc){
      if(err){
        res.status(401).json({
          auth:false,
          message:"Failed to authenticate TOken.. {unauthorized}",
          token:null
        })
      }else{
        User.findById(doc._id,function(err,user){
            if(err){
              res.status(500).json({
                auth:false,
                message:"Internal SErver Error !!!",
                token:null
            })
        }else{
//          res.status(200).send(user)
        next();
        }})

      }
    })
  }
}
