const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const OTP = sequelize.define(
  'OTP',
  {
    otp_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'otp_verifications',
    timestamps: false,
  },
);

module.exports = OTP;
