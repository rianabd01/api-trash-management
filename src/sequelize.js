const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sure_app', 'root', 'yAle3iAiD', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
