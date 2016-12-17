/**
 * Created by ducnt114 on 12/10/16.
 */

var socket = io.connect('http://192.168.1.135:3000', {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax': 5000,
    'reconnectionAttempts': 5
});

socket.on('chat message', function (msg) {
    appendFriendMessage(msg);
});

function onInputKeyPress(key) {
    if (key.keyCode == 13) {
        if(isValidMessage()){
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
    var messageContent = document.getElementById("msgContent");
    appendMyMessage(messageContent.value);
    socket.emit('chat message', messageContent.value);
    messageContent.value = "";
}

function appendFriendMessage(content) {
    var directChatMessage = document.createElement("div");
    directChatMessage.setAttribute("class", "direct-chat-msg");

    var directChatInfo = document.createElement("div");
    directChatInfo.setAttribute("class", "direct-chat-info clearfix");

    var directChatName = document.createElement("span");
    directChatName.setAttribute("class", "direct-chat-name pull-left");
    directChatName.innerHTML = "Nguyen Trung Duc";

    var directChatTimestamp = document.createElement("span");
    directChatTimestamp.setAttribute("class", "direct-chat-timestamp pull-right");
    directChatTimestamp.innerHTML = "23 Jan 2:00 pm";

    var icon = document.createElement("img");
    icon.setAttribute("class", "direct-chat-img");
    icon.setAttribute("src", "/images/favicon.ico");

    var directChatText = document.createElement("div");
    directChatText.setAttribute("class", "direct-chat-text");
    directChatText.innerHTML = content;

    directChatInfo.appendChild(directChatName);
    directChatInfo.appendChild(directChatTimestamp);

    directChatMessage.appendChild(directChatInfo);
    directChatMessage.appendChild(icon);
    directChatMessage.appendChild(directChatText);

    var messageBox = document.getElementById("messagebox");
    messageBox.appendChild(directChatMessage);
    messageBox.scrollTop = messageBox.scrollHeight;
}

function appendMyMessage(content) {
    var directChatMessage = document.createElement("div");
    directChatMessage.setAttribute("class", "direct-chat-msg right");

    var directChatInfo = document.createElement("div");
    directChatInfo.setAttribute("class", "direct-chat-info clearfix");

    var directChatName = document.createElement("span");
    directChatName.setAttribute("class", "direct-chat-name pull-right");
    directChatName.innerHTML = "Nguyen Trung Duc";

    var directChatTimestamp = document.createElement("span");
    directChatTimestamp.setAttribute("class", "direct-chat-timestamp pull-left");
    directChatTimestamp.innerHTML = "23 Jan 2:00 pm";

    var icon = document.createElement("img");
    icon.setAttribute("class", "direct-chat-img");
    icon.setAttribute("src", "/images/favicon.ico");

    var directChatText = document.createElement("div");
    directChatText.setAttribute("class", "direct-chat-text");
    directChatText.innerHTML = content;

    directChatInfo.appendChild(directChatName);
    directChatInfo.appendChild(directChatTimestamp);

    directChatMessage.appendChild(directChatInfo);
    directChatMessage.appendChild(icon);
    directChatMessage.appendChild(directChatText);

    var messageBox = document.getElementById("messagebox");
    messageBox.appendChild(directChatMessage);
    messageBox.scrollTop = messageBox.scrollHeight;
}
