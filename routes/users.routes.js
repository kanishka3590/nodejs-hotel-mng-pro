const express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/users.controller');
const authCtrl = require('../controllers/auth.controller');

//navigating user url to getUser method.we can use only one get,post,put with one router.
router
.route('/users/update/:userId')
.post(authCtrl.validateToken,userCtrl.updateUser); //we are validateing with token

router
.route('/users')
.get(userCtrl.getUsers);

router
.route('/users/:userlId')
.get(userCtrl.getUserData);

router
.route('/users/new')
.post(userCtrl.addUser)

router
.route('/register')
.post(authCtrl.registration);

router
.route('/login')
.post(authCtrl.login);

router
.route('/token')
.get(authCtrl.validateToken);


module.exports =router;
