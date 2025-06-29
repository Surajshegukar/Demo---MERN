const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connectDB");

const authModel = sequelize.define(
  "tbl_admins",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("0", "1"),
      allowNull: false,
      defaultValue: "1",
    },
    is_deleted: {
      type: DataTypes.ENUM("0", "1"),
      allowNull: false,
      defaultValue: "0",
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
{
  timestamps: true,
  createdAt: 'created_on',
  updatedAt: 'updated_on',
  tableName: 'tbl_admins'
});


module.exports = authModel;
