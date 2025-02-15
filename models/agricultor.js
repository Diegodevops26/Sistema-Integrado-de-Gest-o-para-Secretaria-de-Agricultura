const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Tecnicos = require('../models/tecnicos'); // Supondo que o modelo de Tecnico esteja em 'Tecnico.js'

const Agricultor = sequelize.define('Agricultor', {
    id_agricultor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome_completo: { type: DataTypes.STRING(100), allowNull: false },
    cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [11, 11],
            isValidCPF(value) {
                if (!/^(\d{11})$/.test(value)) {
                    throw new Error('CPF deve conter 11 dígitos numéricos.');
                }
            },
        },
    },
    endereco: { type: DataTypes.STRING(200), allowNull: false },
    telefone: { type: DataTypes.STRING(20), allowNull: false },
    tipo_producao: { type: DataTypes.STRING(100), allowNull: false },
    area_cultivo: { type: DataTypes.FLOAT },
    id_tecnico: { // Novo campo para chave estrangeira
        type: DataTypes.INTEGER,
        allowNull: true, // Pode ser nulo se o agricultor não tiver um técnico atribuído
    },
}, {
    tableName: 'AGRICULTORES',
    timestamps: false,
});

// Relacionamento com o modelo Tecnico
Agricultor.belongsTo(Tecnicos, { foreignKey: 'id_tecnico', targetKey: 'id_tecnico' });

module.exports = Agricultor;