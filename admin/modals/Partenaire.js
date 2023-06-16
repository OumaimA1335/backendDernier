const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Produit = require("./Produit");
const { SousCategorie } = require("./SousCategorie");

// Entité marques
const Partenaire = sequelize.define("Partenaires", {
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
  type: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  marque: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  categorie_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: SousCategorie,
      key: "categorie_id",
    },
  },
});
SousCategorie.hasMany(Partenaire, { foreignKey: "categorie_id" });
Partenaire.belongsTo(SousCategorie, { foreignKey: "categorie_id" });

module.exports =Partenaire;
