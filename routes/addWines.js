var express = require('express');
var router = express.Router();
var Wine = require('../public/javascripts/wine');
var colors = require('../public/javascripts/color');
   
/* GET users listing. */
router.get('/', function(req, res, next) {
   res.render('addWines', { title: 'Add new wine', cols: colors });
});

router.post('/', function(req, res) {
    
    var wine = new Wine();
    wine.label = req.body.Label;
    wine.appellation = req.body.Appellation;
    wine.color = req.body.colors;
    
    var app = require('../app');
    app.database.addWine(wine);

    res.redirect('../');
});

module.exports = router;