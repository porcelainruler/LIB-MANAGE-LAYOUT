var express = require('express');
var router = express.Router();
const User = require('../models/user');
var Employee = require('../models/employee');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register',{user:req.session.user});
});

router.post('/', (req, res) => {
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  })
  .then(user => {
      req.session.user = user.dataValues;
      res.redirect('/');
  })
  .catch(error => {
      res.redirect('/register');
  });
});


module.exports = router;
