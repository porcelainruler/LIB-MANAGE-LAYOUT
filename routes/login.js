var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Employee = require('../models/employee');
var dishes = require('../public/shared/dishes')
var chefs = require('../public/shared/leaders')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', (req, res) => {
  var username = req.body.username,
      password = req.body.password;

    console.log( Username = username,Password = password);


  User.findOne({ where: { username: username } }).then(function (user) {
      console.log(user);
      if (!user) {
          res.redirect('/login');
      } else if (user.password!=password) {
          res.redirect('/login');
      } else {
          req.session.user = user.dataValues;
          res.redirect('/');
          /*
          res.render('index' , {dishes: dishes, chefs: chefs, user:req.session.user});
        */
        }
  });
});

router.post('/employee', (req, res) => {
    var username = req.body.username,
        password = req.body.password;
  
      console.log( Username = username,Password = password);
  
  
    Employee.findOne({ where: { username: username } }).then(function (employee) {
        console.log(employee);
        if (!employee) {
            res.redirect('/login');
        } else if (employee.password!=password) {
            res.redirect('/login');
        } else {
            req.session.user = employee.dataValues;
            res.redirect('/');
        }
    });
  });

module.exports = router;
