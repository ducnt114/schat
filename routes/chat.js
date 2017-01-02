/**
 * Created by ducnt114 on 12/10/16.
 */

var express = require('express');
var router = express.Router();
var randomAvatar = require('random-avatar');

router.get('/', function (req, res, next) {

  var token = req.query.token;
  var pairId = req.query.pair_id;
  var destUser = req.query.dest_user;

    res.render('chat', {
      title: 'Chat',
      destUser: destUser,
      selfUrl: randomAvatar(),
      friendUrl: randomAvatar()
    });

});

module.exports = router;
