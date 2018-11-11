var express = require('express');
var dishes = require('../models/dishes');
var Dish = require('../models/dishes');
var auth = require('../middleware/auth');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(dishes);
    Dish.findAll({raw: true}).then((dishes) => {
      console.log(dishes);
         
      res.render('addDish', { dishes: dishes, user:req.session.user });
      
    })
    
  });

router.post('/', (req, res) => {
    Dish.create({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description
    })
    .then(dish => {
        res.redirect('/');
    })
    .catch(error => {
        res.redirect('/adddish');
    });
  });

  
module.exports = router;
