var express = require('express');
const Dish = require('../models/dishes');
const User = require('../models/user');
const Order = require('../models/order');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
    User.findOne({raw: true , where: {userid : req.session.user.userid}}).then((user) => {
        console.log(user);
        console.log(user.dishes);
    
        var dd= user.dishes.split(';');

        var dishes = [];

        for(var i=0;i< dd.length;i++) {
            console.log(dd[i]);
            Dish.findOne({where: {dishid: dd[i]}}).then((dish) => {
                console.log(dish);
                dishes.push(dish);
            })
        };

        console.log(dishes);
    
        res.render('cart', { dishes: dishes, user:req.session.user });
    })
    
  });




module.exports = router;
