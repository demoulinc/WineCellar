var express = require('express');
var router = express.Router();
var Wine = require('../public/javascripts/wine');
var colors = require('../public/javascripts/color');
var url = require('url');
var app = require('../app');

var guid = "";
/* GET users listing. */
router.get('/', function(req, res, next) {
    try {
        var url_parts = url.parse(req.url, true);
        guid = url_parts.query.guid;

        function findWineBasedOnGuid(element) {
            return element.id == guid;
        };

        var app = require('../app');
        var currentWine = app.wines.find(findWineBasedOnGuid);
        if (currentWine == null)
        {
            throw("No wine found for guid : " + guid);   
        }

        res.render('addWines', { title: 'Update wine', wine : currentWine, cols: colors });
    }
    catch(err) {
        console.log("unable to update wine " + err);
        guid ="";
        res.redirect('../wines');
    }
   

});

router.post('/', function(req, res) {
    var app = require('../app');
    function findWineBasedOnGuid(element) {
        return element.id == guid;
    };
    var wine = app.wines.find(findWineBasedOnGuid);
    wine.label = req.body.Label;
    wine.appellation = req.body.Appellation;
    wine.color = req.body.Colors;
    wine.year = req.body.Year;
    wine.dealer = req.body.Dealer;
    wine.region = req.body.Region;
    wine.country = req.body.Country;
    wine.numberOfBottles = req.body.NumberOfBottles;
    wine.grapeVarieties = req.body.GrapeVarieties;
    
    app.database.updateWine(wine);
    res.redirect('../wines');
});

module.exports = router;