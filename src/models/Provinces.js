/* eslint-disable comma-dangle */
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Provinces = sequelize.define(
  'Provinces',
  {
    province_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'provinces',
    timestamps: false,
  },
);

module.exports = Provinces;
