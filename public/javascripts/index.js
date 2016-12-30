/**
 * Created by ducnt114 on 12/29/16.
 */

var wsuri = "ws://104.199.239.43:9000/chat";
var sock = new WebSocket(wsuri);
sock.onopen = function () {
  console.log("connected to " + wsuri);
};
sock.onclose = function (e) {
  console.log("connection closed (" + e.code + ")");
};
sock.onmessage = function (msg) {
  console.log("message received: " + msg.data);
  var message = JSON.parse(msg.data);
  console.log('message data type: ' + message['type']);
  if (message['type'] === 'subscribe' && message['response']['code'] === 0) {
    // send request subscribe success
    // wait for pair matching...

  } else if (message['type'] === 'subscribed_success' && message['response']['code'] === 0) {
    // find a pair chat
    var pairId = message['data']['pair_id'];
    var destUser = message['data']['dest_user'];

    getChatPage(pairId, destUser);

  } else if (message['type'] === 'register' && message['response']['code'] === 0) {
    // register success
    console.log('register success, redirect to landing page...');
    sessionStorage.token = message['data']['token'];
    sessionStorage.name = message['data']['name'];

    $.get('/landing', applyBodyData);

  } else if (message['type'] === 'subscribe' && message['response']['code'] === 0) {
    // subscribe success
    // wait for pair matching...

  } else if (message['type'] === 'subscribed_success' && message['response']['code'] === 0) {
    // found a pair chat
    var pairId = message['data']['pair_id'];
    var destUser = message['data']['dest_user'];

    getChatPage(pairId, destUser);

  } else if (message['type'] === 'deliver_msg' && message['response']['code'] === 0) {
    // receive delivered message
    appendFriendMessage(message['data']['content']);

  } else if (message['type'] === 'login' && message['response']['code'] === 0) {
    // login success
    sessionStorage.token = message['data']['token'];
    sessionStorage.name = message['data']['name'];
    sessionStorage.email = message['data']['email'];

    $.get('/landing', applyBodyData);

  }
};

/**
 * Call back function for apply data to body
 * @param data
 * @param status
 */
function applyBodyData(data, status) {
  $('body').html(data);
  $(window).trigger('resize');
}

/**
 * When click register link on index page
 */
function loadRegisterPage() {
  $.get('/register', applyBodyData);
}

function loadLoginPage() {
  $.get('/login', applyBodyData)
}

function loadLoginWupPage() {
  $.get('/loginwup', applyBodyData);
}

function loadForgotPasswordPage() {
  $.get('/forgotpwd', applyBodyData);
}