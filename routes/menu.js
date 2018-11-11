var express = require('express');
const Dish = require('../models/dishes');
const User = require('../models/user');
const Order = require('../models/order');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Dish.findAll({raw: true}).then((dishes) => {
    console.log(dishes);

    res.render('menu', { dishes: dishes, user:req.session.user });
    
  }) 
  
});

router.get('/:dishId', function(req, res, next) {
  User.findOne({where: {userid : req.session.user.userid}}).then((user) => {
    console.log(user);

    var dd="";
    var flag = false;
    user.dishes.split(';').filter((dish) => {
      if(dish === req.params.dishId) {
        dd = user.dishes;
        flag = true;
      }
    })

    if(!flag) {
      if(user.dishes === ""){
        console.log(user.dishes);
        dd = "" + req.params.dishId;
  
      }else{
        dd = user.dishes + ';' + req.params.dishId;
      }
    }
    
    console.log(dd);
    user.update({
      dishes: dd
    },
    { where: { userid: req.session.user.userid } }
    )
    res.end(user.dishes);
  })
  
});


module.exports = router;
