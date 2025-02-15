const RecuperacaoSenha = require('../models/RecuperacaoSenha');
const Usuario = require('../models/usuario');
const crypto = require('crypto');
const { Op } = require('sequelize');

// Solicitar recuperação de senha
exports.solicitarRecuperacao = async(req, res) => {
    try {
        const { email } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiracao = new Date(Date.now() + 60 * 60 * 1000); // Token válido por 1 hora

        const recuperacao = await RecuperacaoSenha.create({
            id_usuario: usuario.id_usuario,
            token_recuperacao: token,
            expiracao,
        });

        // Enviar o token via e-mail (simulado aqui)
        console.log(`Token de recuperação enviado para ${email}: ${token}`);

        res.status(201).json({ message: 'Token de recuperação criado com sucesso.', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Validar token de recuperação
exports.validarToken = async(req, res) => {
    try {
        const { token } = req.params;
        const recuperacao = await RecuperacaoSenha.findOne({
            where: {
                token_recuperacao: token,
                expiracao: {
                    [Op.gt]: new Date()
                },
                usada: false,
            },
        });

        if (!recuperacao) {
            return res.status(400).json({ error: 'Token inválido ou expirado.' });
        }

        res.status(200).json({ message: 'Token válido.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Resetar senha
exports.resetarSenha = async(req, res) => {
    try {
        const { token } = req.params;
        const { novaSenha } = req.body;

        const recuperacao = await RecuperacaoSenha.findOne({
            where: {
                token_recuperacao: token,
                expiracao: {
                    [Op.gt]: new Date()
                },
                usada: false,
            },
        });

        if (!recuperacao) {
            return res.status(400).json({ error: 'Token inválido ou expirado.' });
        }

        const usuario = await Usuario.findByPk(recuperacao.id_usuario);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        usuario.senha = novaSenha; // Certifique-se de hash para a senha aqui, se necessário
        await usuario.save();

        recuperacao.usada = true;
        await recuperacao.save();

        res.status(200).json({ message: 'Senha resetada com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};