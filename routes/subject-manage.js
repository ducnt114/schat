/**
 * Created by ducnt114 on 1/1/17.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

  res.render('subject-manage', {title: 'Manage subject'});

});

module.exports = router;