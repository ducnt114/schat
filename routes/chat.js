/**
 * Created by ducnt114 on 12/10/16.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('chat', { title: 'Chat' });
});

module.exports = router;
