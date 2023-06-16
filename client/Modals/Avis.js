const { DataTypes, Model } = require("sequelize");
const Produit = require("../../admin/modals/Produit");
const sequelize = require("../../database");
const Users = require("../../admin/modals/Users");
class Avis extends Model {}
Avis.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nbEtoile: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idClient: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Users,
        key: "id",
      },
    },
    idProduit: {
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
  },
  { sequelize, modelName: "avis" }
);

// un produit a plusieurs avis , et un avis appartient a un produit
Produit.hasMany(Avis, { foreignKey: "idProduit" });
Avis.belongsTo(Produit, { foreignKey: "idProduit" });

// un utilisateur a plusieurs avis , et un avis appartient qu'a un utilisateur
Users.hasMany(Avis,{foreignKey: "idClient" });
Avis.belongsTo(Users,{foreignKey: "idClient" });

module.exports = Avis;
