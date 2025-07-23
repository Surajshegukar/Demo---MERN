const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StudentModel = sequelize.define('tbl_students', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
     allowNull: false,
  },
  profile: {
    type: DataTypes.TEXT,
      allowNull: true,

  },
  email: {
    type: DataTypes.STRING(150),
    // unique: true,
     allowNull: false,
  },
  mobile_no: {
    type: DataTypes.STRING(15),
     allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
     allowNull: false,
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
  tableName: 'tbl_students',
});

module.exports = StudentModel;