const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database");
const { Commande } = require('./Commande');
const Produit = require('./Produit');
const Couleur = require("./Couleur");
const Taille = require("./Taille");
const TailleProduit = sequelize.define("taillesProduits", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tailleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Taille,
      key: "id",
    },
  },
  produitId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Produit,
      key: "id",
    },
  },
  quantite: {
    type: DataTypes.INTEGER,
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
  couleurId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Couleur,
      key: "id",
    },
  }
});
Taille.belongsToMany(Produit, { through: TailleProduit });
Produit.belongsToMany(Taille, { through: TailleProduit});
Couleur.belongsToMany(Taille,{ through: TailleProduit});
module.exports =TailleProduit;
