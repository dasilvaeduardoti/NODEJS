const {DataTypes}   = require('sequelize');
const db            = require('../db/conn');

const User = db.define('User', {
    nome: {type: DataTypes.STRING, allowNull: true},
    email: {type: DataTypes.STRING(500), allowNull: true},
    senha: {type: DataTypes.STRING(500), allowNull: true}
});

module.exports = User;