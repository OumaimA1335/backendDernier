const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

// Entité Offre
const Offre = sequelize.define("offre", {
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
  pourcentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dateEnd: {
    type: DataTypes.DATE,
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

module.exports = Offre;
