/**
 * Created by ducnt114 on 12/11/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('forgotpwd', { title: 'Forgot password' });
});

module.exports = router;
