const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Relatorio = sequelize.define('Relatorio', {
    id_relatorio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.ENUM('mensal', 'semanal'),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    data_geracao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'RELATORIOS',
    timestamps: false,
});

module.exports = Relatorio;