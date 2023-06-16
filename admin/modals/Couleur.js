const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Produit = require("./Produit");

// Entité couleurs
const Couleur = sequelize.define("couleurs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  couleur: {
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

module.exports =Couleur;
