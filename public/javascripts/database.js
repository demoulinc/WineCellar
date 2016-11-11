var Sequelize = require('Sequelize');

var sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: 'C:\Users\Cédric\Documents\Coding\WineCellar\WineCellar\db\database.sqlite'
});

module.exports = sequelize;
