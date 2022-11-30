const {DataTypes}   = require('sequelize');
const db            = require('../db/conn');
const Clube         = require('./Clube');

const Endereco = db.define('Endereco', {
    logradouro: {type:DataTypes.STRING(1000), allowNull: false},
    cep: {type:DataTypes.STRING(8), allowNull: false},
    numero: {type:DataTypes.STRING, allowNull: false},
    complemento: {type:DataTypes.STRING(500), allowNull: true}
});

Endereco.belongsTo(Clube); //Um endereço pertence a um Clube
Clube.hasMany(Endereco); //Clube pode ter vários endereços

module.exports = Endereco;