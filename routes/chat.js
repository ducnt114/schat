/**
 * Created by ducnt114 on 12/10/16.
 */

var express = require('express');
var router = express.Router();
var tokenChecker = require('../utils/token_checker');

router.get('/', function (req, res, next) {

  var token = req.query.token;
  var pairId = req.query.pair_id;
  var destUser = req.query.dest_user;

  // if (!tokenChecker.isValidToken(token)) {
  //   console.log('Token invalid, Unauthorized');
  //   res.send(401);
  // } else {
    res.render('chat', {
      title: 'Chat',
      pairId: pairId,
      destUser: destUser});
  // }

});

module.exports = router;
