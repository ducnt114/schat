/**
 * Created by ducnt114 on 12/18/16.
 */
var express = require('express');
var router = express.Router();

router.get('/:category', function (req, res, next) {
  res.render('new-subject-chat', {title: 'New subject chat', category: req.params.category});
});



module.exports = router;