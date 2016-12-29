/**
 * Created by ducnt114 on 12/25/16.
 */

exports.isValidInputText = function (text) {
  if (text != '') {
    return true;
  } else {
    return false;
  }
};

exports.isValidPhoneNumber = function (number) {
  var len = number.match(/\d/g).length;
  return len === 10 || len === 11;
};

exports.isValidEmail = function (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

exports.isValidDateString = function (dateString) {
  return true;
};

exports.isValidPassword = function (pwd) {
  if (pwd != '') {
    return true;
  } else {
    return false;
  }
}