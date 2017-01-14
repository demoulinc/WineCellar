var express = require('express');
var router = express.Router();
var url = require('url');
var app = require('../app');


router.get('/', function(req, res, next) {
    try {
        var guid = "";
        var url_parts = url.parse(req.url, true);
        guid = url_parts.query.guid;
/*
        function findWineBasedOnGuid(element) {
            return element.id == guid;
        };
*/
        var app = require('../app');
       // var wine = app.wines.find(findWineBasedOnGuid);
        for (var i =0; i < app.wines.length; i++)
            if (app.wines[i].id === guid) {
                app.wines.splice(i,1);
                break;
            }
       // var test = app.wines.indexOf(wine.guid);
       // var test2 = app.wines.indexOf(app.wines, app.wines.findWhere(app.wines, {id : wine.guid}));
       // app.wines.splice( app.wines.indexOf(app.wines, app.wines.findWhere(app.wines, {id : wine.guid})), 1 );
       
        app.database.deleteWine(guid);
    }
    catch(err) {
        console.log("unable to update wine " + err);
    }   

    res.redirect('../wines');
});


module.exports = router;