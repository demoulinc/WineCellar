"use strict";

var Sequelize = require('Sequelize');
var Wine = require ('./wine');

module.exports = class Database {
  constructor(){
    this.storagePath =  __dirname + '\\..\\db\\wineCellarDB.sqlite';
  }
  
  initialize()
  {
    this.sequelize = new Sequelize('database', 'username', 'password', {
      host: 'localhost',
      dialect: 'sqlite',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
     
      storage: this.storagePath
      
    });

    this.wine = this.sequelize.define('wine', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
      },
      appellation: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      numberOfBottles: {
        type: Sequelize.INTEGER
      },
      dealer: {
        type: Sequelize.STRING
      },
      grapeVarieties: {
        type: Sequelize.STRING
      }
      }, {
        freezeTableName: true // Model tableName will be the same as the model name
      });

      this.wine.sync();
  }

  authenticate()
  {

    this.sequelize.authenticate()
      .then(function(err) {
        console.log('Connection has been established successfully.');
      })
      .catch(function (err) {
        console.log('Unable to connect to the database:', err);
      });
      // SQLite only
  }

  addWine(wine) {
      return this.wine.create({
        id: wine.id,
        label: wine.label,
        appellation: wine.appellation,
        region: wine.region,
        country: wine.country,
        color: wine.color,
        year: wine.year,
        numberOfBottles: wine.numberOfBottles,
        grapeVarieties: wine.grapeVarieties,
        dealer: wine.dealer
      });
  }

  updateWine(wine) {
    return this.wine.find({ where: { id: wine.id } })
      .then(function (foundWine) {
        // Check if record exists in db
        if (foundWine) {
           foundWine.updateAttributes({
            label: wine.label,
            appellation: wine.appellation,
            region: wine.region,
            country: wine.country,
            color: wine.color,
            year: wine.year,
            numberOfBottles: wine.numberOfBottles,
            grapeVarieties: wine.grapeVarieties,
            dealer: wine.dealer
          })
        }
      })
  }

  deleteWine(wine) {
    return this.wine.deleteAll({ where: { id: wine.id } })
      .then(function () {
       
      })
  }
  getWines() {
    return this.wine.findAll()
      .then(function(winesDb) {
        var Wines = new Array();
        
        var fLen = winesDb.length;
     
        for (var i = 0; i < fLen; i++) {
            var wine = new Wine();
            wine.id = winesDb[i].id,
            wine.label = winesDb[i].label;
            wine.appellation = winesDb[i].appellation;
            wine.color = winesDb[i].color;
            wine.year = winesDb[i].year;
            wine.region = winesDb[i].region;
            wine.country = winesDb[i].country;
            wine.grapeVarieties = winesDb[i].grapeVarieties;
            wine.numberOfBottles = winesDb[i].numberOfBottles;
            wine.dealer = winesDb[i].dealer;
            
            Wines.push(wine);
        };
      
        return Wines;

      });

  };

  
}


