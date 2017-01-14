var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   var app = require('../app');
  
    res.render('wines', { title: 'Wines list', wines: app.wines });
});

module.exports = router;