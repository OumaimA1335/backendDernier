const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Produit = require("./Produit");

// Entité marques
const Marque = sequelize.define("marques", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
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

module.exports =Marque;
