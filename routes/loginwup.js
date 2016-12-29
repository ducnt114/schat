/**
 * Created by ducnt114 on 12/10/16.
 */
var express = require('express');
var router = express.Router();
var validator = require('../utils/validator');
var config = require('../conf/config');

router.get('/', function (req, res, next) {
  res.render('loginwup', {title: 'Login with user and password'});
});

// router.post('/', function (req, res, next) {
//   var email = req.body['email'];
//   var password = req.body['password'];
//
//   if (validator.isValidPassword(password) &&
//     (validator.isValidPhoneNumber(email) || validator.isValidEmail(email))) {
//
//     var data = {
//       "type": "login",
//       "data": {
//         "email": email,
//         "password": password
//       }
//     };
//
//     // call api
//     var payload = JSON.stringify(data);
//
//     var client = new WebSocket(config.apiurl);
//
//     client.on('open', function open() {
//       console.log('connected');
//       client.send(payload);
//     });
//
//     client.on('message', function (data, flags) {
//       console.log(data);
//       var parseData = JSON.parse(data);
//       if (parseData['response']['code'] === 0) {
//         // login success
//         var token = parseData['data']['token'];
//         var name = parseData['data']['name'];
//         var email = parseData['data']['email'];
//
//         res.send({
//           "code": config.responseCode.registerSuccess,
//           "message": "login success",
//           "token": token,
//           "name": name,
//           "email": email
//         });
//       }
//       client.close();
//     });
//
//   }
//
// });

module.exports = router;