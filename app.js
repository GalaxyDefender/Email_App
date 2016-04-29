var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var postmark = require('postmark');
var client = new postmark.Client("1c67841304dceefcf8c27445f8e4a46e@inbound.postmarkapp.com");

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

client.sendEmail({
  "From": "quentin@realtelematics.co.za",
  "To": "quentin@realtelematics.co.za",
  "Subject": "Postmark Test",
  "TextBody": "Hopw this works!"
}, function(error, success){
  if(error){
    console.error("Unable to send via postmark: " + error.message);
    return;
  }
  console.info("Sent to postmark for delivery")
});

// MUST be after bodyParser have been declared
app.post('/contact', function(req,res){
  var mailOpts, smtpTrans;


  // login
  var smtpTrans = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          XOAuth2: {
              user: 'qgerard.gerard@gmail.com',
              clientId: '213095124748-ae5q087i1vbvsfh633fs6tdtvp7naijb.apps.googleusercontent.com ',
              clientSecret: '2MwXP8hgP2JvubwMh8IKiCm6 ',
              access_token: "ya29.CjHTAjXhNiPnuOsjLuAxqflz_oRCLGy8bVLtmc71C1LkykvGFRDxjvEhf4-vWClzGQ0d", 
  token_type: "Bearer", 
  expires_in: 3600,

              refreshToken: '1/Iwglh8UMsgSvy8E1kgT150O4ffWGqcSx-PW5CSIAWRI',
              grant_type: 'refresh_token'
          }
      }
  });

  mailOpts = {
    from: req.body.username + ' <' + req.body.email + '>',
    to: 'quentin@realtelematics.co.za',
    subject: 'Website contact',
    text: req.body.message
  };

  smtpTrans.sendMail(mailOpts, function(error, message){
    if(error){
          console.log(error);
      }else{
          console.log("Message sent");
        }

    console.log(req.body.username + ' <' + req.body.email + '>');
    res.render('contact', {title: 'Thanks'});
    smtpTrans.close();
  });
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
