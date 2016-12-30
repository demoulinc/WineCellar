var express = require('express');
var router = express.Router();
var Wine = require('../public/javascripts/wine');

/* GET users listing. */
router.get('/', function(req, res, next) {
   var colorCollection = ['Red', 'white'];
   res.render('addWines', { title: 'Add new wine', cols: colorCollection });
});

router.post('/', function(req, res) {
    
    var label = req.body.Label;
    var appellation = req.body.Appellation;
    var color = req.body.colors;
    var wine = new Wine();
    wine.label = label;
    wine.appellation = appellation;

    var app = require('../app');
    app.database.addWine(wine);

    res.redirect('../');
});

module.exports = router;