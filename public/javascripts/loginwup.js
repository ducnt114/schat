/**
 * Created by ducnt114 on 12/26/16.
 */

function loginwup() {
  var email = $('#idEmail').val();
  var password = $('#idPassword').val();

  if((isValidEmail(email) || isValidPhoneNumber(email)) && isValidPassword(password)){
    var url = '/loginwup';
    var data = {
      'email': email,
      'password': password
    };
    $.post(url, data, function(data, status){
      if(data['code'] === 0){
        // login success
        sessionStorage.token = data['token'];
        sessionStorage.name = data['name'];
        sessionStorage.email = data['email'];
        window.location = '/landing?token=' + data['token'];
      }
    });
  }
}

function isValidPhoneNumber(text) {
  var len = value.match(/\d/g).length;
  return len === 10 || len === 11;
}

function isValidPassword(pwd) {
  if (pwd != '') {
    return true;
  } else {
    return false;
  }
}

function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}