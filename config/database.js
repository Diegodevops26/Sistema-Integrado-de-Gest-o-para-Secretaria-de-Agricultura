const { Sequelize } = require('sequelize');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize('sistemagro', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false, // Define como false para desativar os logs
});

module.exports = sequelize;