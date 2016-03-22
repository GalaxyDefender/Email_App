var express = require('express');
// var expressMail = require('express-mail');
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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// // Configure express-mail and setup default mail data
// expressMail.extend(app, {
//   transport: 'SMTP',
//   config: {
//     service: 'Gmail',
//     auth: {
//       user: 'qgerard.gerard@gmail.com',
//       pass: 'Qu3ntin1988'
//     }
//   },
//   defaults: {
//     from: 'qgerard.gerard@gmail.com'
//   }
// });

// // Setup email data
// var mailOptions = {
//   to: 'qgerard.gerard@gmail.com',
//   subject: 'Hello from Express Mail!',
//   locals: {
//     title: 'Hello from Express Mail!',
//     message: 'Welcome to my website'
//   }
// }

// // Send email
// app.send('mail', mailOptions, function(err, res){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Message sent: ' + res.message);
//   }
// });

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
