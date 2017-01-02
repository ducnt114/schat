/**
 * Created by ducnt114 on 12/24/16.
 */

function register() {
  // remove all error if existed
  $('#phoneNumberInput').attr('class', 'form-group');
  $('#firstNameInput').attr('class', 'form-group');
  $('#lastNameInput').attr('class', 'form-group');
  $('#emailInput').attr('class', 'form-group');
  $('#cityInput').attr('class', 'form-group');
  $('#birthdayInput').attr('class', 'form-group');
  $('#genderInput').attr('class', 'form-group');
  $('#passwordInput').attr('class', 'form-group');

  var agree = $('#idAgree').is(':checked');

  if (!agree) {
    $('#agreeCheck').attr('class', 'form-group has-error');
    return false;
  } else {
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

    var isValid = true;
    if (!isValidPhoneNumber(phoneNumber)) {
      $('#phoneNumberInput').attr('class', 'form-group has-error');
      isValid = false;
    }

    if (!isValidInputText(firstName)) {
      $('#firstNameInput').attr('class', 'form-group has-error');
      isValid = false;
    }

    if (!isValidInputText(lastName)) {
      $('#lastNameInput').attr('class', 'form-group has-error');
      isValid = false;
    }

    if (!isValidEmail(email)) {
      $('#emailInput').attr('class', 'form-group has-error');
      isValid = false;
    }

    if (!isValidInputText(city)) {
      $('#cityInput').attr('class', 'form-group has-error');
      isValid = false;
    }

    if (!isValidDateString(birthDay)) {
      $('#birthdayInput').attr('class', 'form-group has-error');
      isValid = false;
    }

    if (!isValidInputText(gender)) {
      $('#genderInput').attr('class', 'form-group has-error');
      isValid = false;
    }

    if (!isValidPassword(password)) {
      $('#passwordInput').attr('class', 'form-group has-error');
      isValid = false;
    }

    if (isValid) {
      var url = '/register';
      var data = {
        "type": "register",
        "data": {
          "phone": phoneNumber,
          "password": password,
          "first_name": firstName,
          "last_name": lastName,
          "email": email,
          "city": city,
          "dob": new Date(birthDay).getMilliseconds(),
          "gender": gender
        }
      };
      var payload = JSON.stringify(data);
      console.log('register payload: ' + payload);
      sock.send(payload);

    }

  }
}

function isValidPhoneNumber(phoneNumber) {
  if (phoneNumber === '') {
    return false;
  }
  var len = phoneNumber.match(/\d/g).length;
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
  if(dateString === ''){
    return false;
  }
  try {
    new Date(dateString).getMilliseconds();
    return true;
  } catch (err) {
    return false;
  }
}

