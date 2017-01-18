/**
 * Created by ducnt114 on 12/29/16.
 */

var mapUserPairId = new Map();
var mapPairIdUser = new Map();
var mapUserChatContent = new Map();
var mapSubjectUser = new Map();
var activeChatUser = '';

var wsuri = "ws://104.199.239.43:9000/chat";
var sock = new ReconnectingWebSocket(wsuri, null, {debug: true, reconnectInterval: 3000});

sock.onopen = function () {
  console.log("connected to " + wsuri);
};

sock.onclose = function (e) {
  console.log("connection closed (" + e.code + ")");
};

sock.onmessage = function (msg) {
  console.log("message received: " + msg.data);
  var message = JSON.parse(msg.data);
  var responseType = message['type'];
  var responseCode = message['response']['code'];

  // success code
  switch (responseType) {
    case 'subscribe':
      if (responseCode === 0) {
        // send request subscribe success
        // wait for pair matching...
        $.get('/new-chat-matching', updateMainContent);
      } else if (responseCode === 17) {
        alert(message['response']['message']);
      }
      break;
    case 'subscribed_success':
      if (responseCode === 0) {
        // find a pair chat
        var pairId = message['data']['pair_id'];
        var destUser = message['data']['dest_user'];
        var subjectId = message['data']['subject_id'];
        var subjectName = message['data']['subject_name'];
        mapUserPairId.set(destUser, pairId);
        mapPairIdUser.set(pairId, destUser);
        // append connected user to left-side menu
        if (subjectId === 0) {
          // free-style chat
          addNewUserChatMenu(destUser);
        } else {
          // subject chat
          mapSubjectUser.set(subjectName, destUser);
          addNewSubjectChatMenu(subjectName, pairId);
        }
        getChatPage(destUser);
      }
      break;
    case 'register':
      if (responseCode === 0) {
        // register success
        console.log('register success, redirect to landing page...');
        sessionStorage.token = message['data']['token'];
        sessionStorage.name = message['data']['name'];
        $.get('/landing', applyBodyData);
      }
      break;
    case 'deliver_msg':
      if (responseCode === 0) {
        // receive delivered message
        var pairId = message['data']['pair_id'];
        var destUser = mapPairIdUser.get(pairId);
        if (destUser === activeChatUser) {
          appendFriendMessage(message['data']['content']);
        } else {
          // store message to deactive user chat box
          storeFriendMessage(destUser, message['data']['content']);
        }
      }
      break;
    case 'login':
      if (responseCode === 0) {
        // login success
        sessionStorage.token = message['data']['token'];
        sessionStorage.name = message['data']['name'];
        sessionStorage.email = message['data']['email'];

        var role = message['data']['role'];
        if (role === 'admin') {
          window.location = '/admin';
        } else {
          $.get('/landing', applyBodyData);
        }
      } else if (responseCode === 9) {
        // User not found
        $('#loginerror').empty();
        var loginError = document.getElementById('loginerror');
        var alertBox = document.createElement('div');
        alertBox.setAttribute('class', 'alert alert-warning alert-dismissible');
        var closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('class', 'close');
        closeButton.setAttribute('data-dismiss', 'alert');
        closeButton.setAttribute('aria-hidden', 'true');
        closeButton.appendChild(document.createTextNode('x'));
        alertBox.appendChild(closeButton);
        var i = document.createElement('i');
        i.setAttribute('class', 'icon fa fa-warning');
        alertBox.appendChild(i);
        alertBox.appendChild(document.createTextNode(' ' + message['response']['message']));
        loginError.appendChild(alertBox);
      }
      break;
    case 'create_cfs':
      if (responseCode === 0) {
        // create new confession success
        $.get('/landing', applyBodyData);
      }
      break;
    case 'get_incoming_ff_req':
      if (responseCode === 0) {
        // got data for incoming find friend request
        updateIncomingFindFriendPage(message['data']);
      }
      break;
    case 'update_status':
      if (responseCode === 0) {
        switch (message['data']['status']) {
          case 'offline':
            // user is offline now
            var pairId = message['data']['pair_id'];
            var offlineMessage = message['data']['message'];
            updateChatStatus(pairId, offlineMessage);
            break;
        }
      }
      break;
    case 'leave_chat':
      if (responseCode === 0) {
        if (message['data']['pair_id']) {
          // friend close that chat session
          var pairId = message['data']['pair_id'];
          var leaveMessage = message['data']['leave_msg'];
          updateChatStatus(pairId, leaveMessage);
        }
      }
      break;
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

function loadLandingContentPage() {
  $.get('/landing/content', updateMainContent);
}
