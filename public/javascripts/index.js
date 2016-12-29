/**
 * Created by ducnt114 on 12/29/16.
 */

var wsuri = "ws://104.199.239.43:9000/chat";
var sock = new WebSocket(wsuri);
sock.onopen = function () {
  console.log("connected to " + wsuri);
};
sock.onclose = function (e) {
  console.log("connection closed (" + e.code + ")");
};
sock.onmessage = function (msg) {
  console.log("message received: " + msg.data);
  if (msg.data['type'] === 'subscribe' && msg.data['response']['code'] === 0) {
    // send request subscribe success
    // wait for pair matching...
  } else if (msg.data['type'] === 'subscribed_success' && msg.data['response']['code'] === 0) {
    // find a pair chat
    var pairId = msg.data['data']['pair_id'];
    var destUser = msg.data['data']['dest_user'];

    getChatPage(pairId, destUser);
  } else if (msg.data['type'] === 'register' && msg.data['response']['code'] === 0) {
    // register success
    sessionStorage.token = msg.data['token'];
    sessionStorage.name = msg.data['name'];
    window.location = '/landing';
  } else if (msg.data['type'] === 'subscribe' && msg.data['response']['code'] === 0) {
    // subscribe success
    // wait for pair matching...
  } else if (msg.data['type'] === 'subscribed_success' && msg.data['response']['code'] === 0) {
    // found a pair chat
    var pairId = msg.data['data']['pair_id'];
    var destUser = msg.data['data']['dest_user'];

    getChatPage(pairId, destUser);
  }
};