var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// xoauth2gen = xoauth2.createXOAuth2Generator({
//     user: "qgerard.gerard@gmail.com",
//     clientId: "{Client ID}",
//     clientSecret: "{Client Secret}",
//     refreshToken: "{User Refresh Token}",
//     customHeaders: {
//       "HeaderName": "HeaderValue"
//     },
//     customPayload: {
//       "payloadParamName": "payloadValue"
//     },
//     token: true,
//     accessToken: true
// });

// // SMTP/IMAP
// xoauth2gen.getToken(function(err, token){
//     if(err){
//         return console.log(err);
//     }
//     console.log("AUTH XOAUTH2 " + token);
// });

// // HTTP
// xoauth2gen.getToken(function(err, token, accessToken){
//     if(err){
//         return console.log(err);
//     }
//     console.log("Authorization: Bearer " + accessToken);
// });

// // Listen for token updates (if refreshToken is set)
// // you probably want to store these to a db
// xoauth2.on('token', function(token){
//   console.log('New token for %s: %s', token.user, token.accessToken);
// });

// create reusable transport object using the default SMTP transport
var transporter = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: 'qgerard.gerard@gmail.com',
      clientId: '213095124748-ae5q087i1vbvsfh633fs6tdtvp7naijb.apps.googleusercontent.com',
      clientSecret: '2MwXP8hgP2JvubwMh8IKiCm6',
      refreshToken: '1/zZk5SYCpdZeSurGNsYUXteks5zr1l86jxKVQ0scgDQk',
      accessToken: 'ya29.rgIDxSb1MAfgpe4egB3p8N3gLiroWB6ZI2ytaDW2WFj2PCtjXwC5WRdNCE2r65p1JA'
    })
  }
});

// setup e-mail data 
var mailOptions = {
  from: 'qgerard.gerard@gmail.com',
  to: 'qgerard.gerard@gmail.com',
  subject: 'Another Hello this is Nodemailer',
  text: 'Hello this is a node test'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(err, info){
  if (err) {
    return console.log(err);
  }
  console.log('Message sent: ' + info.response);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
