const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sure_application', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
