const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const validator = require('validator'); // Para validação de CPF

const User = sequelize.define('User', {
    id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome_completo: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [11, 11],
            isValidCPF(value) {
                if (!validator.isLength(value, { min: 11, max: 11 }) || !validator.isNumeric(value)) {
                    throw new Error('CPF deve conter 11 dígitos numéricos.');
                }
            },
        },
    },
    senha_hash: { type: DataTypes.STRING(255), allowNull: false },
    senha_salt: { type: DataTypes.STRING(255), allowNull: false },
    ultimo_login: { type: DataTypes.DATE },
    status_login: { type: DataTypes.BOOLEAN, defaultValue: true },
    is_admin: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    tableName: 'USUARIOS_LOGIN',
    timestamps: false
});

// Hook para criptografar a senha antes de salvar
User.beforeCreate(async (user) => {
    if (user.senha_hash) {
        const salt = await bcrypt.genSalt(10);
        user.senha_hash = await bcrypt.hash(user.senha_hash, salt);
        user.senha_salt = salt;
    }
});

module.exports = User;
