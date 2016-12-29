/**
 * Created by ducnt114 on 12/11/16.
 */

var express = require('express');
var validator = require('../utils/validator');
var router = express.Router();
var config = require('../conf/config');


router.get('/', function (req, res, next) {
  res.render('register', {title: 'Register'});
});


module.exports = router;
