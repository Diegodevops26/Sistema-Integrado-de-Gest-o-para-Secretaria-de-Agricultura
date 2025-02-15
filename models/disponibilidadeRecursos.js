const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Recurso = require('./recursos');

const DisponibidadeRecurso = sequelize.define('disponibilidadeRecurso', {
    id_disponibilidade: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_recurso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Recurso,
            key: 'id_recurso',
        },
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    horario_inicio: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    horario_fim: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    disponivel: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'DESPONIBILIDADE_RECURSOS',
    timestamps: false,
});

module.exports = DisponibidadeRecurso;