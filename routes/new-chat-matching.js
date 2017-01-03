/**
 * Created by ducnt114 on 1/4/17.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('new-chat-matching', {title: 'New chat matching'});
});

module.exports = router;
