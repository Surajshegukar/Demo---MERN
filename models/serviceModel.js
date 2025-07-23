const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const serviceModel = sequelize.define('tbl_services', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  service_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  service_description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  
  service_img: {
    type: DataTypes.TEXT,
      allowNull: true,

  },
  status: {
    type: DataTypes.ENUM('0', '1'),
    allowNull: false,
    defaultValue: '1',
  },
  is_deleted: {
    type: DataTypes.ENUM('0', '1'),
    allowNull: false,
    defaultValue: '0',
  },
  created_on: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_on: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'tbl_services',
});

module.exports = serviceModel;