var express = require('express');
var router = express.Router();
var Wine = require('../public/javascripts/wine');
var colors = require('../public/javascripts/color');
var url = require('url');
var app = require('../app');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    if (!url_parts.search || 0 === url_parts.search.length)
    {
        res.render('addWines', { title: 'Add new wine', cols: colors });
    }
    else 
    {
       var query = url_parts.query;
       if (query.guid) 
       {
           function findWineBasedOnGuid(element) {
                return element.id == query.guid;

            };      
            var app = require('../app');
           var currentWine = app.wines.find(findWineBasedOnGuid);
           if (currentWine != null)
           {
               res.render('addWines', { title: 'Add new wine', wine : currentWine, cols: colors });  
           }
           else 
           {
              res.render('addWines', { title: 'Add new wine', cols: colors });
           }
           
       }
    }
    
    

});

router.post('/', function(req, res) {
   
    res.redirect('../wines');
});

module.exports = router;