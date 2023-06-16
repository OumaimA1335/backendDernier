const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database");
const { Commande } = require('./Commande');
const Produit = require('./Produit');
const Couleur = require("./Couleur");
const CouleursProduit = sequelize.define("couleursProduits", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  couleurId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Couleur,
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
    allowNull: true,
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
Couleur.belongsToMany(Produit, { through: CouleursProduit });
Produit.belongsToMany(Couleur, { through: CouleursProduit});
module.exports =CouleursProduit;
