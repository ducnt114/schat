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
  // mapUserChatContent.set(activeChatUser, $('#allChatBox'));
  // if (mapUserChatContent.has(destUser)) {
  //   activeChatUser = destUser;
  //   updateMainContent(mapUserChatContent.get(destUser), null);
  // } else {
  $.get('/chat', function (data, status) {
    mapUserChatContent.set(destUser, data);
    activeChatUser = destUser;
    updateMainContent(data, status);
  });
  // }
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
  }
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