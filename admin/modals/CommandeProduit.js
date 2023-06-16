const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database");
const { Commande } = require('./Commande');
const Produit = require('./Produit');
const CommandeProduit = sequelize.define("commandeProduits", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  commandeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Commande,
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
    defaultValue: 1,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  taille :{
    type: DataTypes.STRING,
    allowNull: true,
  },
  couleur :{
    type: DataTypes.STRING,
    allowNull: true,
  }
});
Commande.belongsToMany(Produit, { through: CommandeProduit });
Produit.belongsToMany(Commande, { through: CommandeProduit });
module.exports = CommandeProduit;
