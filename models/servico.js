const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');


const Servico = sequelize.define('Servico', {
    id_servico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_servico: {
        type: DataTypes.INTEGER(100),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
    },
    duracao: {
        type: DataTypes.TIME,
    },
}, {
    tableName: `SERVICOS`,
    timestamps: false,
});