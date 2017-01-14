var express = require('express');
var router = express.Router();
var Wine = require('../public/javascripts/wine');
var colors = require('../public/javascripts/color');
var url = require('url');
var app = require('../app');

/* GET users listing. */
router.get('/', function(req, res, next) {
    try {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        function findWineBasedOnGuid(element) {
            return element.id == query.guid;
        };

        var app = require('../app');
        var currentWine = app.wines.find(findWineBasedOnGuid);
        if (currentWine == null)
        {
            throw("No wine found for guid : " + query.guid);   
        }

        res.render('addWines', { title: 'Update wine', wine : currentWine, cols: colors });
    }
    catch(err) {
        console.log("unable to update wine " + err);
        res.redirect('../wines');
    }
   

});

router.post('/', function(req, res) {
   
    res.redirect('../wines');
});

module.exports = router;