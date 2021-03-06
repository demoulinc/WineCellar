var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./public/javascripts/database');
var index = require('./routes/index');
var wines = require('./routes/wines');
var addWines = require('./routes/addWines');
var updateWines = require('./routes/updateWines');
var deleteWines = require('./routes/deleteWines');
var app = express();

app.database = new database();
app.database.initialize();
app.database.authenticate();
app.database.getWines()
      .then(function(wines) {
          app.wines = wines;
      });
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

app.use('/', index);
app.use('/wines', wines);
app.use('/wines/add', addWines);
app.use('/wines/update', updateWines);
app.use('/wines/delete', deleteWines);

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
