const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Produit = require("./Produit");

// Entité marques
const newsLettres= sequelize.define("newsLettres", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports =newsLettres;
