var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var edge = require('edge.js');
var expressEdge = require('express-edge');
var indexRouter = require('./routes/index');
var menuRouter = require('./routes/menu');
var aboutRouter = require('./routes/aboutus');
var contactRouter = require('./routes/contactus');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');

var Sequelize = require('sequelize')

var sequelize = new Sequelize('LIBMANAGE', 'root', 'Shaj9650@' ,
   {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    
  });
 

var app = express();

// view engine setup
app.use(expressEdge);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', edge);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/menu', menuRouter);
app.use('/aboutus', aboutRouter);
app.use('/contactus', contactRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
