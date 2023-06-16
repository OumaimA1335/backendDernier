const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Taille = require("./Taille");
const Categorie = sequelize.define("categories", {
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

// Entité sous catégorie
const SousCategorie = sequelize.define("sousCategories", {
  idSousCategorie: {
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
  nomcategorie: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

});
// un taille appratient a une sous catégories , une sous catégorie  a un ou zéro taille 
module.exports = {SousCategorie,Categorie};
