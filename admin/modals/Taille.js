const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Produit = require("./Produit");

// Entité marques
const Taille = sequelize.define("tailles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  taille: {
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

module.exports =Taille;
