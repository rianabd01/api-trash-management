/* eslint-disable comma-dangle */
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

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

const Pictures = sequelize.define(
  'Pictures',
  {
    picture_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_path: { type: DataTypes.STRING, allowNull: false },
    trash_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Trash,
        key: 'trash_id',
      },
    },
  },
  {
    tableName: 'trash_pictures',
    timestamps: false,
  }
);

// Define associations
Trash.hasMany(Pictures, { as: 'pictures', foreignKey: 'trash_id' });
Pictures.belongsTo(Trash, { foreignKey: 'trash_id' });

module.exports = { Trash, Pictures };
