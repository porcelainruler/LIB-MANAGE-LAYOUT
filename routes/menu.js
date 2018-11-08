var express = require('express');
var dishes = require('../public/shared/dishes')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('menu', { dishes: dishes });
});

module.exports = router;
