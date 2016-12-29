/**
 * Created by ducnt114 on 12/24/16.
 */

function register() {
  var agree = $('#idAgree').is(':checked');
  if (agree) {
    // if agree with condition
    // get register form value, check valid data then submit
    var phoneNumber = $('#idPhoneNumber').val();
    var firstName = $('#idFirstName').val();
    var lastName = $('#idLastName').val();
    var email = $('#idEmail').val();
    var city = $('#idCity').val();
    var birthDay = $('#idBirthDay').val();
    var gender = $('#idGender').val();
    var password = $('#idPassword').val();

    if (isValidInputText(phoneNumber) && isValidInputText(firstName)
      && isValidInputText(lastName) && isValidEmail(email)
      && isValidInputText(city) && isValidDateString(birthDay)
      && isValidInputText(gender) && isValidPassword(password)) {
      var url = '/register';
      var data = {
        'phoneNumber': phoneNumber,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'city': city,
        'birthday': birthDay,
        'gender': gender,
        'password': password
      };
      var payload = JSON.stringify(data);
      sock.send(payload);

      // $.post(url, data, function (data, status) {
      //   if (status === 'success') {
      //     if (data['code'] === 0) {
      //       sessionStorage.token = data['token'];
      //       sessionStorage.name = data['name'];
      //       window.location = '/landing?token=' + data['token'];
      //     }
      //     ;
      //   }
      // });
      // return true;
    }

  } else {
    // if not agree, don't submit register form
    return false;
  }

}

function isValidPhoneNumber(text) {
  var len = value.match(/\d/g).length;
  return len === 10 || len === 11;
}

function isValidInputText(text) {
  if (text != '') {
    return true;
  } else {
    return false;
  }
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

function isValidDateString(dateString) {
  return true;
}

