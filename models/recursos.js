const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recurso = sequelize.define('recurso', {

    id_recurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    tipo_recurso: {
        type: DataTypes.ENUM('trator', 'veiculo'),
        allowNull: false,
        validate: {
            isIn: {
                args: [
                    ['trator', 'veiculo']
                ],
                msg: 'Tipo de recurso deve ser "trator" ou " veiculo".',
            },
        },
    },
    descricao_recurso: {
        type: DataTypes.STRING(200),
        allowNull: true, // Pode ser `true`, pois não foi especificado como obrigatório no SQL.
    },
}, {
    tableName: 'RECURSOS',
    timestamps: false, // Desabilitado conforme o padrão.
});

module.exports = Recurso;