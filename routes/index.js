var express = require('express');
var dishes = require('../public/shared/dishes');
var chefs = require('../public/shared/leaders');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { dishes: dishes, chefs: chefs, user:req.session.user });
});

module.exports = router;
