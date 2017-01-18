/**
 * Created by ducnt114 on 12/10/16.
 */

// Update window location but not reload the page
// history.pushState({}, null, '/chat');

function onInputKeyPress(key) {
  if (key.keyCode == 13) {
    if (isValidMessage()) {
      sendMessage();
    }
    return false;
  }
}

function isValidMessage() {
  var messageContent = document.getElementById("msgContent").value;
  if (messageContent === "") {
    return false;
  }
  return true;
}

function sendMessage() {
  var messageContent = $('#msgContent').val();
  appendMyMessage(messageContent);
  var data = {
    "type": "send_msg",
    "data": {
      "pair_id": mapUserPairId.get(activeChatUser),
      "content": messageContent,
      "token": sessionStorage.token
    }
  };
  var payload = JSON.stringify(data);
  console.log('chat message send:' + payload);
  sock.send(payload);
  $("#msgContent").val("");
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

  // 0 for myself, 1 for friend, -1 for empty
  var finalFlagElement = document.getElementById('allChatBox').querySelector('#finalChatId');

  if (finalFlagElement.value != '1') {
    directChatMessage.appendChild(directChatInfo);
    // directChatMessage.appendChild(icon);
  }
  directChatMessage.appendChild(directChatText);

  finalFlagElement.value = '1';

  var messageBox = document.getElementById("messagebox");
  messageBox.appendChild(directChatMessage);
  messageBox.scrollTop = messageBox.scrollHeight;

  emojify.run();

  mapUserChatContent.set(activeChatUser, document.getElementById('allChatBox'));
}

function appendMyMessage(content) {
  var directChatMessage = document.createElement("div");
  directChatMessage.setAttribute("class", "direct-chat-msg right");

  var directChatInfo = document.createElement("div");
  directChatInfo.setAttribute("class", "direct-chat-info clearfix");

  var directChatName = document.createElement("span");
  directChatName.setAttribute("class", "direct-chat-name pull-right");
  directChatName.innerHTML = sessionStorage.name;

  // var directChatTimestamp = document.createElement("span");
  // directChatTimestamp.setAttribute("class", "direct-chat-timestamp pull-left");
  // directChatTimestamp.innerHTML = "23 Jan 2:00 pm";

  var icon = document.createElement("img");
  icon.setAttribute("class", "direct-chat-img");
  icon.setAttribute("src", $('#selfAvatarUrlId').val());

  var directChatText = document.createElement("div");
  directChatText.setAttribute("class", "direct-chat-text");
  directChatText.innerHTML = content;

  directChatInfo.appendChild(directChatName);
  // directChatInfo.appendChild(directChatTimestamp);

  // 0 for myself, 1 for friend, -1 for empty
  var finalFlagElement = document.getElementById('allChatBox').querySelector('#finalChatId');

  if (finalFlagElement.value != '0') {
    directChatMessage.appendChild(directChatInfo);
    // directChatMessage.appendChild(icon);
  }
  directChatMessage.appendChild(directChatText);

  finalFlagElement.value = '0';

  var messageBox = document.getElementById("messagebox");
  messageBox.appendChild(directChatMessage);
  messageBox.scrollTop = messageBox.scrollHeight;

  emojify.run();

  mapUserChatContent.set(activeChatUser, document.getElementById('allChatBox'));
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
  icon.setAttribute("src", oldChatBox.querySelector('#friendAvatarUrlId').value);

  var directChatText = document.createElement("div");
  directChatText.setAttribute("class", "direct-chat-text");
  directChatText.innerHTML = data;

  directChatInfo.appendChild(directChatName);
  // directChatInfo.appendChild(directChatTimestamp);

  // 0 for myself, 1 for friend, -1 for empty
  var finalFlagElement = oldChatBox.querySelector('#finalChatId');

  if (finalFlagElement.value != '1') {
    directChatMessage.appendChild(directChatInfo);
    // directChatMessage.appendChild(icon);
  }
  directChatMessage.appendChild(directChatText);

  finalFlagElement.value = '1';

  oldChatBox.querySelector('#messagebox').appendChild(directChatMessage);
  mapUserChatContent.set(destUser, oldChatBox);
}

function updateChatStatus(pairId, offlineMessage) {
  var destUser = mapPairIdUser.get(pairId);
  var chatBox = mapUserChatContent.get(destUser);

  var statusMessage = document.createElement('p');
  statusMessage.setAttribute('class', 'text-red');
  statusMessage.appendChild(document.createTextNode(offlineMessage));
  chatBox.querySelector('#messagebox').appendChild(statusMessage);

  mapUserChatContent.set(destUser, chatBox);
}

function leaveChat() {
  // Delete chat menu
  var pairId = mapUserPairId.get(activeChatUser);
  var menuItem = document.getElementById(pairId);
  if (menuItem) {
    menuItem.parentNode.removeChild(menuItem);
  }

  // Send leave_chat message
  var data = {
    "type": "leave_chat",
    "data": {
      "pair_id": pairId,
      "token": sessionStorage.token
    }
  };
  var payload = JSON.stringify(data);
  sock.send(payload);

  // Load landing content
  $.get('/landing/content', updateMainContent);
}

emojify.setConfig({
  emojify_tag_type: 'div',           // Only run emojify.js on this element
  only_crawl_id: null,            // Use to restrict where emojify.js applies
  img_dir: 'images/emoji',  // Directory for emoji images
  ignored_tags: {                // Ignore the following tags
    'SCRIPT': 1,
    'TEXTAREA': 1,
    'A': 1,
    'PRE': 1,
    'CODE': 1
  }
});

// $('#msgContent').emojiPicker({
//   height: '300px',
//   width:  '450px'
// });

