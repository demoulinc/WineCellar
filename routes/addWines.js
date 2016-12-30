var express = require('express');
var router = express.Router();
var Wine = require('../public/javascripts/wine');
var colors = require('../public/javascripts/color');
   
/* GET users listing. */
router.get('/', function(req, res, next) {
   res.render('addWines', { title: 'Add new wine', cols: colors });
});

router.post('/', function(req, res) {
    
    var label = req.body.Label;
    var appellation = req.body.Appellation;
    var color = req.body.colors;
    var wine = new Wine();
    wine.label = label;
    wine.appellation = appellation;
    wine.color = color;
    var app = require('../app');
    app.database.addWine(wine);

    res.redirect('../');
});

module.exports = router;