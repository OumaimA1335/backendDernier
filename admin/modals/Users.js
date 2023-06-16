const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Role = require('./Role');

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique : true,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Role,
      key: "id",
    },
  },
  image: {
    type: DataTypes.CHAR,
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
  Mdp: {
    type: DataTypes.STRING,
    unique : true,
    allowNull: false
  }
});
// un utilisateur a un seul role , et un role peut appartient à plusieures utilisateur
Users.belongsTo(Role,{foreignKey:"role_id"});
module.exports = Users;
