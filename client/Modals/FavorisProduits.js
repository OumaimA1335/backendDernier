const { DataTypes, Model } = require("sequelize");
const Produit = require("../../admin/modals/Produit");
const Users = require("../../admin/modals/Users");
const sequelize = require("../../database");


const FavorisProduits = sequelize.define("favorisProduits", {
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
Users.belongsToMany(Produit, { through: FavorisProduits });
Produit.belongsToMany(Users, { through: FavorisProduits });
module.exports = FavorisProduits;
