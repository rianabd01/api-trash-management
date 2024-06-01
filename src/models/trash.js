/* eslint-disable comma-dangle */
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const { Pictures } = require('./pictures');

const Trash = sequelize.define(
  'Trash',
  {
    trash_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    city_id: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    location_url: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'trash',
    timestamps: false,
  }
);

Trash.hasMany(Pictures, { as: 'pictures', foreignKey: 'trash_id' });

module.exports = { Trash };
