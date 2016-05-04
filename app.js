var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MUST be after bodyParser have been declared
app.post('/contact', function(req,res){
  var mailOpts, smtpTrans;


  mailOpts = {
    from: 'qgerard.gerard@gmail.com',
    to: 'quentin@realtelematics.co.za',
    subject: 'Website contact',
    text: req.body.message,
    html: '<h1>Sender Name:</h1><h3>' + req.body.username + '</h3><h1>Email Address:</h1><h3>' + req.body.email + '</h3><p>' + req.body.message + '</p>'
  };

  smtpTrans = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "qgerard.gerard@gmail.com",
        pass: "mwcciqcglhnukibf"
    }
  });

  smtpTrans.sendMail(mailOpts, function(error, message){
    if(error){
          res.render('contact', {title: 'Contact', status: 'Error sending message!'});
          console.log(error);
      }else{
          console.log(req.body.username + ' <' + req.body.email + '>');
          res.render('contact', {title: 'Contact', status: 'Message sent!'});
          console.log("Message sent");
        }

  });
    smtpTrans.close();
});

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
