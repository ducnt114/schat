/**
 * Created by ducnt114 on 12/12/16.
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
      "type": "view_cfs_list",
      "data": {}
    };
    var payload = JSON.stringify(data);
    sock.send(payload);
  });
  sock.on('message', function (msg, flags) {
    console.log("message received: " + msg);
    var message = JSON.parse(msg);
    if (message['type'] === 'view_cfs_list' && message['response']['code'] === 0) {
      var confessions = [];
      for (var subject in message['data']) {
        confessions.push({
          "location": message['data'][subject]['location'],
          "content": message['data'][subject]['content'],
          "timestamp": new Date().toISOString().substring(0, 10)
        })
      }
      sock.close();
      res.render('confession', {title: 'Confession', confessions: confessions});
    }
  });
  sock.on('close', function () {
    console.log('close websocket to api server.');
  });
});

module.exports = router;
