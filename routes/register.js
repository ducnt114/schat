/**
 * Created by ducnt114 on 12/11/16.
 */

var express = require('express');
var validator = require('../utils/validator');
var router = express.Router();
var config = require('../conf/config');


router.get('/', function (req, res, next) {
  res.render('register', {title: 'Register'});
});

// router.post('/', function (req, res, next) {
//   var phoneNumber = req.body['phoneNumber'];
//   var firstName = req.body['firstName'];
//   var lastName = req.body['lastName'];
//   var email = req.body['email'];
//   var city = req.body['city'];
//   var birthday = req.body['birthday'];
//   var gender = req.body['gender'];
//   var password = req.body['password'];
//
//   if (validator.isValidInputText(phoneNumber) && validator.isValidInputText(firstName)
//     && validator.isValidInputText(lastName) && validator.isValidEmail(email)
//     && validator.isValidInputText(city) && validator.isValidDateString(birthday)
//     && validator.isValidInputText(gender) && validator.isValidPassword(password)) {
//
//     // data is valid
//     var data = {
//       "type": "register",
//       "data": {
//         "phone": phoneNumber,
//         "password": password,
//         "first_name": firstName,
//         "last_name": lastName,
//         "email": email,
//         "city": city,
//         "dob": birthday + 'T00:00:00Z',
//         "gender": gender
//       }
//     };
//
//     var payload = JSON.stringify(data);
//     console.log(payload);
//
//     var client = new WebSocket(config.apiurl);
//
//     client.on('open', function open() {
//       console.log('connected');
//       client.send(payload);
//     });
//
//     client.on('message', function (data, flags) {
//       var parseData = JSON.parse(data);
//       console.log("register received: " + parseData['type']);
//       if (parseData['type'] === 'register' && parseData['response']['code'] === 0) {
//         // register success
//         var token = parseData['data']['token'];
//         var name = parseData['data']['name'];
//         var email = parseData['data']['email'];
//
//         res.send({
//           "code": config.responseCode.registerSuccess,
//           "message": "register success",
//           "token": token,
//           "name": name
//         });
//       }
//       client.close();
//     });
//
//   } else {
//     res.send("register error");
//   }
//
// });

module.exports = router;
