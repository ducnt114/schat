/**
 * Created by ducnt114 on 12/10/16.
 */
var express = require('express');
var router = express.Router();
var config = require('../conf/config');

router.get('/', function (req, res, next) {
  res.render('loginwup', {title: 'Login with user and password'});
});

module.exports = router;