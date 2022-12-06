const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    'db_auth', 'root', '', {host: 'localhost', dialect: 'mysql'}
);

try {
    sequelize.authenticate();
    console.log("Banco de dados conectado com sucesso!");
} catch (error) {
    console.log("Erro ao conectar no Banco de Dados. "+error);
}

module.exports = sequelize;