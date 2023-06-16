const { DataTypes, Model } = require("sequelize");
const Produit = require("../../admin/modals/Produit");
const Users = require("../../admin/modals/Users");
const sequelize = require("../../database");


const PanierProduits = sequelize.define("PanierProduits", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
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
  taille :{
    type: DataTypes.STRING,
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
  couleur: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
Users.belongsToMany(Produit, { through: PanierProduits });
Produit.belongsToMany(Users, { through: PanierProduits });
module.exports = PanierProduits;