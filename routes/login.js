var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login'});
});


router.post('/check', function(req, res, next) {
    console.log("Check login req: " + req);
    res.send("login success");
});

module.exports = router;
