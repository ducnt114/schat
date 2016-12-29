/**
 * Created by ducnt114 on 12/27/16.
 */

var jwt = require('jsonwebtoken');
var config = require('../conf/config');

exports.isValidToken = function (token) {
  try {
    console.log("decoding token...");
    console.log("token: " + token);
    console.log("secret: " + config.superSecret);
    var decoded = jwt.verify(token, config.superSecret);
    console.log(decoded);
    return true;
  } catch (err) {
    console.log("decode token error:");
    console.log(err);
    return false;
  }
};