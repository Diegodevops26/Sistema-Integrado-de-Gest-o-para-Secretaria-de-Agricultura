const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Agendamento = require('./agendamentos'); // Importar o modelo de Agendamentos

const Notificacao = sequelize.define('Notificacao', {
    id_notificacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_agendamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'AGENDAMENTOS',
            key: 'id_agendamento'
        }
    },
    mensagem: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('info', 'alerta', 'erro'),
        allowNull: false
    },
    data_envio: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

sequelize.sync({ force: true });