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
  $.get('/new-subject-chat', updateMainContent);

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
  $.get('/chat', updateMainContent);
}

function getIncomingFindFriendPage() {
  $.get('/incoming-find-friend', updateMainContent);
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

function updateMainContent(data, status) {
  $('#mainContainer').empty();
  $('#mainContainer').html(data);
  $(window).trigger('resize');
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

function logout() {
  window.location = '/';
}