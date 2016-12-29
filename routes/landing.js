/**
 * Created by ducnt114 on 12/11/16.
 */

var express = require('express');
var router = express.Router();
var WebSocket = require('ws');

router.get('/', function (req, res, next) {

  var wsuri = "ws://104.199.239.43:9000/chat";
  var sock = new WebSocket(wsuri);
  sock.on('open', function open() {
    console.log("connected to " + wsuri);
    // load list of categories
    var data = {
      "type": "get_subject_list"
    };
    var payload = JSON.stringify(data);
    sock.send(payload);
  });
  sock.on('message', function (msg, flags) {
    console.log("message received: " + msg);
    var message = JSON.parse(msg);
    if (message['type'] === 'get_subject_list' && message['response']['code'] === 0) {
      var categories = [];
      for (var subject in message['data']) {
        categories.push({
          "id": 0,
          "title": "Văn hóa",
          "user_online": 123
        })
      }
      res.render('landing', {title: 'Landing', categories: categories});
      sock.close();
    }
  });
  sock.on('close', function () {
    console.log('close websocket to api server.');
  });
});

module.exports = router;