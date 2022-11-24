const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('db_comum', 'root', '', {host: 'localhost', dialect: 'mysql'});

try {
    sequelize.authenticate();
    console.log('Banco de Dados conectado com sucesso!');    
} catch (error) {
    console.log('Erro ao conectar com o DB. '+error);
}

module.exports = sequelize;