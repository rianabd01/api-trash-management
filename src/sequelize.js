const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sure_app', 'root', 'yAle3iAiD', {
  host: 'https://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/',
  dialect: 'mysql',
});

module.exports = sequelize;
