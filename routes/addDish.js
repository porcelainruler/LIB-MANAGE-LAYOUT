var express = require('express');
var dishes = require('../public/shared/dishes');
var auth = require('../middleware/auth');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(dishes);
    res.render('addDish', { dishes: dishes, user:req.session.user });
  });

  module.exports = router;
