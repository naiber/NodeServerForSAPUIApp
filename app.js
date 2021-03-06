var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
/*var wwwPort = require('bin/www')*/

var index = require('./routes/index');
var users = require('./routes/users');
var suppliers = require('./routes/suppliers');
var works = require('./routes/works');
var records = require('./routes/records');
var books = require('./routes/books');

const dbuser = "naiber";
const dbpassword = "m1ch3l35";
const host = 'ds211309.mlab.com:11309';
//const host = 'localhost:27017';
const dbName = 'usereport';
global.secret = "xxx";
//init mongoose link
var mongoose = require('mongoose');

mongoose.connect('mongodb://'+dbuser+":"+dbpassword+"@"+host+'/'+dbName);
//mongoose.connect('mongodb://'+host+'/'+dbName);

var db = mongoose.connection;

db.on('error',function()
{
    console.error('Connection error!');
});
db.once('open',function()
{
    process.stdout.write('DB connection Ready');
})
var app = express();
app.use(cors());
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

/////////setup base routes/////////
app.use('/', index);
app.use('/users', users);
app.use('/suppliers',suppliers);
app.use('/works',works);
app.use('/records',records);
app.use('/books',books);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
