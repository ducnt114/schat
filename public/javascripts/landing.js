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
function getNewSubjectChatPage(subjectId) {
  var url = '/new-subject-chat';
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
  $(window).trigger('resize');
}

function logout() {
  window.location = '/';
}