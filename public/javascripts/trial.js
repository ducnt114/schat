/**
 * Created by ducnt114 on 1/2/17.
 */
var mapUserPairId = new Map();
var mapPairIdUser = new Map();
var mapUserChatContent = new Map();
var activeChatUser = '';

var wsuri = "ws://104.199.239.43:9000/chat";
var sock = new WebSocket(wsuri);

sock.onopen = function () {
  console.log("connected to " + wsuri);
  getTrialContentPage();
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
      case 'try':
        // submit try success
        var token = message['data']['token'];
        var name = message['data']['name'];
        var email = message['data']['email'];
        sessionStorage.token = token;
        sessionStorage.name = name;
        sessionStorage.email = email;
        // load free landing page
        loadFreeLandingPage();
        break;
      case 'subscribed_success':
        // find a pair chat
        var pairId = message['data']['pair_id'];
        var destUser = message['data']['dest_user'];
        sessionStorage.pairId = pairId;
        sessionStorage.destUser = destUser;
        mapUserPairId.set(destUser, pairId);
        mapPairIdUser.set(pairId, destUser);
        // append connected user to left-side menu
        addNewUserChatMenu(destUser);
        getChatPage(pairId, destUser);
        break;
      case 'deliver_msg':
        // receive delivered message
        var pairId = message['data']['pair_id'];
        var destUser = mapPairIdUser.get(pairId);
        if (destUser === activeChatUser) {
          appendFriendMessage(message['data']['content']);
        } else {
          // store message to deactive user chat box
          storeFriendMessage(destUser, message['data']['content']);
        }
        break;
    }
  }
};

function getTrialContentPage() {
  $.get('/trial/content', updateMainContent);
}

function loadFreeLandingPage() {
  $.get('/trial/landing', updateMainContent);
}

function updateMainContent(data, status) {
  $('#mainContainer').empty();
  $('#mainContainer').html(data);
  $(window).trigger('resize');
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

function getFreeStyleChat() {
  // subscribe free style chat
  $.get('/new-subject-chat', updateMainContent);

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

function addNewUserChatMenu(destUser) {
  var listChat = document.getElementById('listChatUserId');

  var li = document.createElement('li');

  var a = document.createElement('a');
  a.setAttribute('href', '#');
  var pairId = mapUserPairId.get(destUser);
  a.setAttribute('onclick', 'getChatPage("' + pairId + '", "' + destUser + '")');

  var i = document.createElement('i');
  i.setAttribute('class', 'fa fa-user')

  a.appendChild(i);
  a.appendChild(document.createTextNode(destUser));

  li.appendChild(a);

  listChat.appendChild(li);
}

function getChatPage(pairId, destUser) {
  if (mapUserChatContent.has(destUser)) {
    mapUserChatContent.set(activeChatUser, document.getElementById('allChatBox'));
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

function appendFriendMessage(content) {
  var directChatMessage = document.createElement("div");
  directChatMessage.setAttribute("class", "direct-chat-msg");

  var directChatInfo = document.createElement("div");
  directChatInfo.setAttribute("class", "direct-chat-info clearfix");

  var directChatName = document.createElement("span");
  directChatName.setAttribute("class", "direct-chat-name pull-left");
  directChatName.innerHTML = activeChatUser;

  // var directChatTimestamp = document.createElement("span");
  // directChatTimestamp.setAttribute("class", "direct-chat-timestamp pull-right");
  // directChatTimestamp.innerHTML = "23 Jan 2:00 pm";

  var icon = document.createElement("img");
  icon.setAttribute("class", "direct-chat-img");
  icon.setAttribute("src", $('#friendAvatarUrlId').val());

  var directChatText = document.createElement("div");
  directChatText.setAttribute("class", "direct-chat-text");
  directChatText.innerHTML = content;

  directChatInfo.appendChild(directChatName);
  // directChatInfo.appendChild(directChatTimestamp);

  directChatMessage.appendChild(directChatInfo);
  directChatMessage.appendChild(icon);
  directChatMessage.appendChild(directChatText);

  var messageBox = document.getElementById("messagebox");
  messageBox.appendChild(directChatMessage);
  messageBox.scrollTop = messageBox.scrollHeight;

  emojify.run();
}

function storeFriendMessage(destUser, data) {
  var oldChatBox = mapUserChatContent.get(destUser);

  var directChatMessage = document.createElement("div");
  directChatMessage.setAttribute("class", "direct-chat-msg");

  var directChatInfo = document.createElement("div");
  directChatInfo.setAttribute("class", "direct-chat-info clearfix");

  var directChatName = document.createElement("span");
  directChatName.setAttribute("class", "direct-chat-name pull-left");
  directChatName.innerHTML = destUser;

  // var directChatTimestamp = document.createElement("span");
  // directChatTimestamp.setAttribute("class", "direct-chat-timestamp pull-right");
  // directChatTimestamp.innerHTML = "23 Jan 2:00 pm";

  var icon = document.createElement("img");
  icon.setAttribute("class", "direct-chat-img");
  icon.setAttribute("src", oldChatBox.getElementById('friendAvatarUrlId').value);

  var directChatText = document.createElement("div");
  directChatText.setAttribute("class", "direct-chat-text");
  directChatText.innerHTML = data;

  directChatInfo.appendChild(directChatName);
  // directChatInfo.appendChild(directChatTimestamp);

  directChatMessage.appendChild(directChatInfo);
  directChatMessage.appendChild(icon);
  directChatMessage.appendChild(directChatText);

  oldChatBox.getElementById(messagebox).appendChild(directChatMessage);
  mapUserChatContent.set(destUser, oldChatBox);
}

function getOutgoingFindFriendPage() {
  $.get('/outgoing-find-friend', updateMainContent);
}

function getConfessionPage() {
  $.get('/confession', updateMainContent);
}