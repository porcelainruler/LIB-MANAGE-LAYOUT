var express = require('express');
var Dish = require('../models/dishes');
var chefs = require('../public/shared/leaders');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Dish.findAll({raw: true}).then((dishes) => {
    console.log(dishes);
       
    res.render('index', { dishes: dishes, chefs: chefs, user:req.session.user });
    
  })
});

module.exports = router;
