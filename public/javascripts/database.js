"use strict";

var Sequelize = require('Sequelize');
var Wine = require ('./wine');

module.exports = class Database {
  constructor(){}
  
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

      storage: 'C:\Users\Cédric\Documents\Coding\WineCellar\WineCellar\db\database2.sqlite'

    });

    this.wine = this.sequelize.define('wine', {
      label: {
        type: Sequelize.STRING
      },
      appellation: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
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
        label: wine.label,
        appellation: wine.appellation,
        region: wine.region,
        color: wine.color,
        numberOfBottles: wine.numberOfBottles,
        grapeVarieties: wine.grapeVarieties,
        dealer: wine.dealer
      });
  }

  getWines() {
    return this.wine.findAll()
      .then(function(winesDb) {
        var Wines = new Array();
        
        var fLen = winesDb.length;
     
        for (var i = 0; i < fLen; i++) {
            var wine = new Wine();
            wine.label = winesDb[i].label;
            wine.appellation = winesDb[i].appellation;
            wine.color = winesDb[i].color;
            wine.region = winesDb[i].region;
            wine.grapeVarieties = winesDb[i].grapeVarieties;
            wine.numberOfBottles = winesDb[i].numberOfBottles;
            wine.dealer = winesDb[i].dealer;
            
            Wines.push(wine);
        };
      
        return Wines;

      });

  };

  
}


