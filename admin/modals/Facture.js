const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const {Commande }= require("./Commande");

const Facture = sequelize.define("factures", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TotalHT: {
    type: DataTypes.DOUBLE,
    unique: true,
    allowNull: false,
  },
  TVA: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  TotalTTC: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  TotalNet: {
    type: DataTypes.DOUBLE,
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
  commandeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Commande,
      key: "id",
    },
  },
});


module.exports = Facture;
