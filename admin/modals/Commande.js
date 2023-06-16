const { DataTypes , Model } = require("sequelize");
const Users = require("../modals/Users");
const sequelize = require("../../database");
const Facture = require("./Facture");
const  Produit  = require("./Produit");
class Commande extends Model {}
 Commande.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Adresse: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  Tel: {
    type: DataTypes.STRING,
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
  idClient: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: "id",
    },
  },
  Etat: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Non livrée'
  },
  Paiement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmation: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Non confirmeé'
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{sequelize, modelName: 'commandes' } );




// Relation : un utilisateur a plusieurs commandes
Users.hasMany(Commande,{foreignKey :"idClient"});
Commande.belongsTo(Users,{foreignKey :"idClient"});

// une commande a une seul facture
Facture.belongsTo(Commande,{foreignKey :"commandeId"});
Commande.hasOne(Facture,{foreignKey :"commandeId"});

module.exports = 
{Commande};
