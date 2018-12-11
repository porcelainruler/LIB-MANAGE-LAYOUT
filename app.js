var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var edge = require('edge.js');
var expressEdge = require('express-edge');
var expressValidator = require('express-validator');

var db = require("./models");

var indexRouter = require('./routes/index');
var menuRouter = require('./routes/menu');
var cartRouter = require('./routes/cart');
var addDishRouter = require('./routes/addDish');
var aboutRouter = require('./routes/aboutus');
var contactRouter = require('./routes/contactus');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');

var session = require('express-session')
var auth = require('./middleware/auth');

/*
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
*/ 

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

app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/');
  } else {
      next();
  }    
};

var employeeChecker = (req, res, next) => {
  if (req.session.user && req.session.user.isEmployee) {
      res.redirect('/adddish');
  } else {
      next();
  }    
};

app.use('/', indexRouter);
app.use('/menu', menuRouter);
app.use('/adddish', addDishRouter);
app.use('/aboutus', aboutRouter);
app.use('/contactus', contactRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);


app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.redirect('/');
  } else {
      res.redirect('/login');
  }
});


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
  //res.render('error');
});

module.exports = app;
