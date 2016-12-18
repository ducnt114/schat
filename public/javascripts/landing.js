/**
 * Created by ducnt114 on 12/18/16.
 */


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
function getNewSubjectChatPage(subjectName) {
  var url = '/new-subject-chat/' + subjectName;
  $.get(url, function (data, status) {
    updateMainContent(data);

    setTimeout(getChatPage(), 50000);
  });
}

function getChatPage() {
  $.get('/chat', function (data, status) {
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