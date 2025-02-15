const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agendamentos = sequelize.define('Agendamentos', {
    id_agendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios_Login', // Nome correto da tabela
            key: 'id_usuario',
        },
        onDelete: 'CASCADE',
    },
    id_recurso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Recursos', // Nome correto da tabela
            key: 'id_recurso',
        },
        onDelete: 'CASCADE',
    },
    id_servico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Servicos', // Nome correto da tabela
            key: 'id_servico',
        },
        onDelete: 'CASCADE',
    },
    data_agendamento: DataTypes.DATE,
    horario_inicio: DataTypes.TIME,
    horario_fim: DataTypes.TIME,
    status: {
        type: DataTypes.ENUM('pendente', 'confirmado', 'cancelado'),
        defaultValue: 'pendente',
    },
});

sequelize.sync({ alter: true });