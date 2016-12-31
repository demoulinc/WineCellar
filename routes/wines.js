var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   var app = require('../app');
   app.database.getWines()
      .then(function(wines) {
          res.render('wines', { title: 'wine list', wines: wines });
      });
   
   
});

module.exports = router;