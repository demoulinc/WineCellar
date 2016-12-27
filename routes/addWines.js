var express = require('express');
var router = express.Router();
var Wine = require('../public/javascripts/wine');
/* GET users listing. */
router.get('/', function(req, res, next) {
   res.render('addWines', { title: 'Add new wine' });
});

router.post('/', function(req, res) {
    
    var label = req.body.Label;
    var Appellation = req.body.Appellation;
    console.log(label + Appellation);
    var wine = new Wine();
    wine.label = label;
    wine.Appellation = Appellation;

    res.redirect('../');
});

module.exports = router;