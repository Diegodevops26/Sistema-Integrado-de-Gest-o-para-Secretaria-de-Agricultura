const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo de Visita Técnica
const VisitaTecnica = sequelize.define('VisitaTecnica', {
    id_visita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_agricultor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_tecnico: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    data_visita: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'VISITAS_TECNICAS',
    timestamps: false, // Desativar timestamps automáticos
});

// Definir as relações
VisitaTecnica.associate = (models) => {
    VisitaTecnica.belongsTo(models.Agricultor, { foreignKey: 'id_agricultor' });
    VisitaTecnica.belongsTo(models.Tecnico, { foreignKey: 'id_tecnico' });
};

module.exports = VisitaTecnica;