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
      //this.wine.sync({force: true}).then(function () {
      // Table created
      return this.wine.create({
        label: wine.label,
        appellation: wine.appellation
      });
//});

  }
}


