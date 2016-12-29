/**
 * Created by ducnt114 on 12/11/16.
 */

var express = require('express');
var router = express.Router();
var tokenChecker = require('../utils/token_checker');

router.get('/', function (req, res, next) {

  // var token = req.query.token;
  // if(!tokenChecker.isValidToken(token)){
  //   console.log('Token invalid, Unauthorized');
  //   res.sendStatus(401);
  // }

  // load list of categories
  var categories = [
    {
      "id": 0,
      "title": "Văn hóa",
      "link": "van_hoa",
      "user_online": 123
    },
    {
      "id": 1,
      "title": "Xã hội",
      "link": "xa_hoi",
      "user_online": 456
    },
    {
      "id": 2,
      "title": "Tình yêu",
      "link": "tinh_yeu",
      "user_online": 123
    },
    {
      "id": 3,
      "title": "Xã hội",
      "link": "xa_hoi",
      "user_online": 456
    },
    {
      "id": 4,
      "title": "Văn hóa",
      "link": "van_hoa",
      "user_online": 123
    },
    {
      "id": 5,
      "title": "Xã hội",
      "link": "xa_hoi",
      "user_online": 456
    },
    {
      "id": 6,
      "title": "Văn hóa",
      "link": "van_hoa",
      "user_online": 123
    },
    {
      "id": 7,
      "title": "Xã hội",
      "link": "xa_hoi",
      "user_online": 456
    }
  ];

  res.render('landing', {title: 'Landing', categories: categories});
});

module.exports = router;