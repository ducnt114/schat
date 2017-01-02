/**
 * Created by ducnt114 on 1/2/17.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('trial', {title: 'Trial'});
});

router.get('/content', function (req, res, next) {
  res.render('trial-content', {title: 'Trial content'});
});

router.get('/landing', function (req, res, next) {
  res.render('trial-landing', {title: 'Trial landing'});
});

module.exports = router;
