/**
 * Created by ducnt114 on 12/11/16.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

  // load list of categories
  var categories = [
    {
      "title": "Văn hóa",
      "link": "van_hoa",
      "user_online": 123
    },
    {
      "title": "Xã hội",
      "link": "xa_hoi",
      "user_online": 456
    },
    {
      "title": "Tình yêu",
      "link": "tinh_yeu",
      "user_online": 123
    },
    {
      "title": "Xã hội",
      "link": "xa_hoi",
      "user_online": 456
    },
    {
      "title": "Văn hóa",
      "link": "van_hoa",
      "user_online": 123
    },
    {
      "title": "Xã hội",
      "link": "xa_hoi",
      "user_online": 456
    },
    {
      "title": "Văn hóa",
      "link": "van_hoa",
      "user_online": 123
    },
    {
      "title": "Xã hội",
      "link": "xa_hoi",
      "user_online": 456
    }
  ];

  res.render('landing', {title: 'Landing', categories: categories});
});

module.exports = router;