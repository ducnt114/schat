/**
 * Created by ducnt114 on 12/18/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('new-pair-chat', {title: 'New pair chat'});
});

module.exports = router;