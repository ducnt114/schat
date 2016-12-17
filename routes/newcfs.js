/**
 * Created by ducnt114 on 12/12/16.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('newcfs', { title: 'New Confession' });
});

module.exports = router;