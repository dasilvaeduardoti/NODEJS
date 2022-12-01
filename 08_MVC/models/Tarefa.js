const {DataTypes}   = require('sequelize');
const db            = require('../db/conn');

const Tarefa = db.define('Tarefa', {
    titulo: {type:DataTypes.STRING, allowNull: false},
    descricao: {type:DataTypes.STRING(500), allowNull: true},
    status: {type:DataTypes.BOOLEAN, allowNull: false}
});

module.exports = Tarefa;