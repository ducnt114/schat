function statusChangeCallback(response) {
    // console.log('statusChangeCallback');
    // console.log(response);
    if (response.status === 'connected') {
        testAPI();
    } else if (response.status === 'not_authorized') {
        // document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
        // document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1543209295988269',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    // console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=name,email', function (response) {
        // console.log(response);
        // console.log('Successful login for: ' + response.name);
        // document.getElementById('status').innerHTML =
        //     'Thanks for logging in, ' + response.name + '!';
    });
}

function loginWithFacebook() {

    FB.login(function (response) {
        if (response.authResponse) {
            FB.api('/me?fields=name,email,gender,birthday', function (response) {
                var url = "/login/check";
                var data = {
                    "userId": response.id,
                    "userName": response.name,
                    "email": response.email,
                    "gender": response.gender,
                    "birthday": response.birthday
                };
                console.log(data);
                $.post(url, data, function(data, status){
                    // console.log(data);
                    window.location.href = "/landing";
                });
            });
        } else {
            // console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'public_profile, email, user_birthday'});

}

