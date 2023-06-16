const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Produit = require("./Produit");

// Entité marques
const Contact= sequelize.define("contacts", {
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
  tel: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  sujet: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
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

module.exports =Contact;
