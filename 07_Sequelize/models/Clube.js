const db            = require('../db/conn');
const {DataTypes}   = require('sequelize');

const Clube = db.define('Clube', {
    nome:{type:DataTypes.STRING(1000), allowNull: false},
    status:{type:DataTypes.BOOLEAN, allowNull: false} 
});

module.exports = Clube;