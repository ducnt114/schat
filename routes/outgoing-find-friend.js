/**
 * Created by ducnt114 on 12/18/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('outgoing-find-friend', {title: 'Outgoing find friend'});
});

module.exports = router;