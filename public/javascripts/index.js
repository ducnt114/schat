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
  // if current page is trial then get trial content
  var location = window.location;
  if (location.pathname === '/trial') {
    sessionStorage.trial = 1;
    loadTrialContentPage();
  }
};

sock.onclose = function (e) {
  console.log("connection closed (" + e.code + ")");
};

sock.onmessage = function (msg) {
  console.log("message received: " + msg.data);
  var message = JSON.parse(msg.data);
  var responseType = message['type'];
  var responseCode = message['response']['code'];

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
        sessionStorage.trial = 0;
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
        sessionStorage.trial = 0;

        var role = message['data']['role'];
        if (role === 'admin') {
          window.location = '/admin';
        } else {
          $.get('/landing', applyBodyData);
          history.pushState({}, null, '/index.html');
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
    case 'try':
      if (responseCode === 0) {
        // submit try success
        var token = message['data']['token'];
        var name = message['data']['name'];
        var email = message['data']['email'];
        sessionStorage.token = token;
        sessionStorage.name = name;
        sessionStorage.email = email;
        // load free landing page
        loadFreeLandingPage();
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

function loadTrialContentPage() {
  $.get('/trial/content', updateMainContent);
}

function loadFreeLandingPage() {
  $.get('/trial/landing', updateMainContent);
}

function submitTry() {
  var data = {
    "type": "try",
    "data": {
      "gender": $('#idGender').val()
    }
  };

  var payload = JSON.stringify(data);
  sock.send(payload);
}

function getNewPairChatPage() {
  var data = {
    "type": "subscribe",
    "data": {
      "token": sessionStorage.token,
      "subject_id": 0
    }
  };

  var payload = JSON.stringify(data);
  console.log("subscribe request payload: " + payload);

  sock.send(payload);
}

function getChatPage(destUserOrSubject) {
  var destUser;
  // check if param is user or subject
  if (mapUserPairId.has(destUserOrSubject)) {
    // is User
    destUser = destUserOrSubject;
  } else {
    // is Subject
    destUser = mapSubjectUser.get(destUserOrSubject);
  }

  if (mapUserChatContent.has(destUser)) {
    activeChatUser = destUser;
    updateMainContent(mapUserChatContent.get(destUser), null);
  } else {
    $.get('/chat?dest_user=' + destUser, function (data, status) {
      mapUserChatContent.set(destUser, data);
      activeChatUser = destUser;
      updateMainContent(data, status);
    });
  }
}

function addNewUserChatMenu(destUser) {
  var listChat = document.getElementById('listChatUserId');
  var pairId = mapUserPairId.get(destUser);

  var li = document.createElement('li');
  li.setAttribute('id', pairId);

  var a = document.createElement('a');
  a.setAttribute('href', '#');
  a.setAttribute('onclick', 'getChatPage("' + destUser + '")');

  var i = document.createElement('i');
  i.setAttribute('class', 'fa fa-user');

  a.appendChild(i);
  a.appendChild(document.createTextNode(destUser));

  li.appendChild(a);

  listChat.appendChild(li);
}

function getNewSubjectChatPage(subjectId) {
  var data = {
    "type": "subscribe",
    "data": {
      "token": sessionStorage.token,
      "subject_id": subjectId
    }
  };

  var payload = JSON.stringify(data);
  console.log("subscribe request payload: " + payload);

  sock.send(payload);
}

function getOutgoingFindFriendPage() {
  $.get('/outgoing-find-friend', updateMainContent);
}

/**
 * When click on #Confession menu
 */
function getConfessionPage() {
  $.get('/confession', updateMainContent);
}

function loadNewConfessionPage() {
  $.get('/newcfs', updateMainContent);
}

function submitNewConfession() {
  var cfsContent = $('#newCfsContentId').val();
  var data = {
    "type": "create_cfs",
    "data": {
      "token": sessionStorage.token,
      "content": cfsContent
    }
  };
  var payload = JSON.stringify(data);
  sock.send(payload);
}

function submitForgotPassword() {
  var email = $('#forgotPwdId').val();
  // TODO
}

function logout() {
  window.location = '/';
}

function getIncomingFindFriendPage() {
  // $.get('/incoming-find-friend', updateMainContent);

  // call api for getting data
  var data = {
    "type": "get_incoming_ff_req",
    "data": {
      "token": sessionStorage.token
    }
  };
  var payload = JSON.stringify(data);
  sock.send(payload);
}

function updateIncomingFindFriendPage(data) {
  $('#mainContainer').empty();
  // generate DOM object
  for (var index in data) {
    var row = document.createElement('div');
    row.setAttribute('class', 'row');

    var col = document.createElement('div');
    col.setAttribute('class', 'col-md-6');

    var box = document.createElement('div');
    box.setAttribute('class', 'box box-widget');

    var boxHeader = document.createElement('div');
    boxHeader.setAttribute('class', 'box-header with-border');

    var userBlock = document.createElement('div');
    userBlock.setAttribute('class', 'user-block');

    var userBlock1 = document.createElement('img');
    userBlock1.setAttribute('class', 'img-circle');
    userBlock1.setAttribute('src', '/images/favicon.ico');

    var userBlock2 = document.createElement('span');
    userBlock2.setAttribute('class', 'username');
    userBlock2.appendChild(document.createTextNode(data[index]['created_user'])); // user name

    var userBlock3 = document.createElement('span');
    userBlock3.setAttribute('class', 'description');
    userBlock3.appendChild(document.createTextNode(data[index]['last_chat'])); // time

    var boxTools = document.createElement('div');
    boxTools.setAttribute('class', 'box-tools');

    var btButton = document.createElement('button');
    btButton.setAttribute('type', 'button');
    btButton.setAttribute('class', 'btn btn-box-tool');
    btButton.setAttribute('data-widget', 'remove');

    var btI = document.createElement('i');
    btI.setAttribute('class', 'fa fa-times');

    var boxBody = document.createElement('div');
    boxBody.setAttribute('class', 'box-body');

    var boxBodyP = document.createElement('p');
    boxBodyP.appendChild(document.createTextNode(data[index]['content'])); // content

    var boxFooter = document.createElement('div');
    boxFooter.setAttribute('class', 'box-footer');

    var boxFooterImg = document.createElement('img');
    boxFooterImg.setAttribute('class', 'img-responsive img-circle img-sm');
    boxFooterImg.setAttribute('src', '/images/favicon.ico');

    var boxFooterImgPush = document.createElement('div');
    boxFooterImgPush.setAttribute('class', 'img-push');

    var boxFooterInput = document.createElement('input');
    boxFooterInput.setAttribute('type', 'text');
    boxFooterInput.setAttribute('class', 'form-control input-sm');
    boxFooterInput.setAttribute('placeholder', 'Press enter to post comment');

    // append child

    userBlock.appendChild(userBlock1);
    userBlock.appendChild(userBlock2);
    userBlock.appendChild(userBlock3);

    btButton.appendChild(btI);
    boxTools.appendChild(btButton);

    boxHeader.appendChild(userBlock);
    boxHeader.appendChild(boxTools);

    boxBody.appendChild(boxBodyP);

    boxFooterImgPush.appendChild(boxFooterInput);
    boxFooter.appendChild(boxFooterImg);
    boxFooter.appendChild(boxFooterImgPush);

    box.appendChild(boxHeader);
    box.appendChild(boxBody);
    box.appendChild(boxFooter);

    col.appendChild(box);

    row.appendChild(col);

    $('#mainContainer').append(row);
  }
  $(window).trigger('resize');
}

function addNewSubjectChatMenu(subjectName, pairId) {
  var listChat = document.getElementById('listSubjectChatId');

  var li = document.createElement('li');
  li.setAttribute('id', pairId);

  var a = document.createElement('a');
  a.setAttribute('href', '#');
  a.setAttribute('onclick', 'getChatPage("' + subjectName + '")');

  var i = document.createElement('i');
  i.setAttribute('class', 'fa fa-user');

  a.appendChild(i);
  a.appendChild(document.createTextNode(subjectName));

  li.appendChild(a);

  listChat.appendChild(li);
}

function updateMainContent(data, status) {
  $('#mainContainer').empty();
  $('#mainContainer').html(data);
  $(window).trigger('resize');
}