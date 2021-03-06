var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var loginRoute = require('./routes/login');
var chatRoute = require('./routes/chat');
var registerRoute = require('./routes/register');
var forgotpasswordRoute = require('./routes/forgotpassword');
var thankyouRoute = require('./routes/thankyou');
var landingRoute = require('./routes/landing');
var confessionRoute = require('./routes/confession');
var newcfsRoute = require('./routes/newcfs');
var newChatMatchingRoute = require('./routes/new-chat-matching');
var outgoingFindFriendRoute = require('./routes/outgoing-find-friend');
var incomingFindFriendRoute = require('./routes/incoming-find-friend');

var adminRoute = require('./routes/admin');
var subjectManageRoute = require('./routes/subject-manage');
var userManageRoute = require('./routes/user-manage');
var userReportRoute = require('./routes/user-report');

var trialRoute = require('./routes/trial');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/login', loginRoute);
app.use('/chat', chatRoute);
app.use('/register', registerRoute);
app.use('/forgotpwd', forgotpasswordRoute);
app.use('/thankyou', thankyouRoute);
app.use('/landing', landingRoute);
app.use('/confession', confessionRoute);
app.use('/newcfs', newcfsRoute);
app.use('/new-chat-matching', newChatMatchingRoute);
app.use('/outgoing-find-friend', outgoingFindFriendRoute);
app.use('/incoming-find-friend', incomingFindFriendRoute);

app.use('/admin', adminRoute);
app.use('/subject-manage', subjectManageRoute);
app.use('/user-manage', userManageRoute);
app.use('/user-report', userReportRoute);

app.use('/trial', trialRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
