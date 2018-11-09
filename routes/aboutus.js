var express = require('express');
var chefs = require('../public/shared/leaders')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('aboutus', { chefs:chefs });
});

module.exports = router;
