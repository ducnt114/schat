/**
 * Created by ducnt114 on 12/18/16.
 */

// Update window location but not reload the page
history.pushState({}, null, '/landing');

/**
 * When click new pair chat
 */
function getNewPairChatPage() {
  $.get('/new-pair-chat', function (data, status) {
    updateMainContent(data);

    setTimeout(getChatPage(), 50000);
  });
}

/**
 * When click on subject chat
 * @param subjectName
 */
function getNewSubjectChatPage(subjectId, subjectName) {
  var url = '/new-subject-chat/' + subjectName;
  $.get(url, function (data, status) {
    updateMainContent(data);
    // setTimeout(getChatPage(), 50000);
  });

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
  // var sock = null;
  // var wsuri = "ws://104.199.239.43:9000/chat";
  // sock = new WebSocket(wsuri);
  // sock.onopen = function () {
  //   console.log("connected to " + wsuri);
  //   sock.send(payload);
  // };
  // sock.onclose = function (e) {
  //   console.log("connection closed (" + e.code + ")");
  // };
  // sock.onmessage = function (msg) {
  //   console.log("message received: " + msg.data);
  //   if (msg.data['type'] === 'subscribe' && msg.data['response']['code'] === 0) {
  //     // send request subscribe success
  //     // wait for pair matching...
  //   }
  //   if (msg.data['type'] === 'subscribed_success' && msg.data['response']['code'] === 0) {
  //     // find a pair chat
  //     var pairId = msg.data['data']['pair_id'];
  //     var destUser = msg.data['data']['dest_user'];
  //
  //     getChatPage(pairId, destUser);
  //   }
  // };

}

function getChatPage(pairId, destUser) {
  var url = '/chat?token=' + sessionStorage.token + '&pair_id=' + pairId + '&dest_user=' + destUser;
  $.get(url, function (data, status) {
    updateMainContent(data);
  });
}

function getIncomingFindFriendPage() {
  $.get('/incoming-find-friend', function (data, status) {
    updateMainContent(data);
  });
}

function getOutgoingFindFriendPage() {
  $.get('/outgoing-find-friend', function (data, status) {
    updateMainContent(data);
  });
}

/**
 * When click on #Confession menu
 */
function getConfessionPage() {
  $.get('/confession', function (data, status) {
    updateMainContent(data);
  });
}

function updateMainContent(data) {
  $('#mainContainer').empty();
  $('#mainContainer').html(data);
}

function logout() {
  window.location = '/login';
}