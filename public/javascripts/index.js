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

  if (message['response']['code'] === 0) {
    // success code
    switch (message['type']) {
      case 'subscribe':
        // send request subscribe success
        // wait for pair matching...
        break;
      case 'subscribed_success':
        // find a pair chat
        var pairId = message['data']['pair_id'];
        var destUser = message['data']['dest_user'];
        sessionStorage.pairId = pairId;
        sessionStorage.destUser = destUser;
        getChatPage();
        break;
      case 'register':
        // register success
        console.log('register success, redirect to landing page...');
        sessionStorage.token = message['data']['token'];
        sessionStorage.name = message['data']['name'];
        $.get('/landing', applyBodyData);
        break;
      case 'deliver_msg':
        // receive delivered message
        appendFriendMessage(message['data']['content']);
        break;
      case 'login':
        // login success
        sessionStorage.token = message['data']['token'];
        sessionStorage.name = message['data']['name'];
        sessionStorage.email = message['data']['email'];
        $.get('/landing', applyBodyData);
        break;
      case 'create_cfs':
        // create new confession success
        $.get('/landing', applyBodyData);
        break;
      case 'get_incoming_ff_req':
        // got data for incoming find friend request
        updateIncomingFindFriendPage(message['data']);
        break;
    }
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
