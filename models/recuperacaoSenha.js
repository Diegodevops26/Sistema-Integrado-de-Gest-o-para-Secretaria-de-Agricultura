const RecuperacaoSenha = require('../models/RecuperacaoSenha');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const moment = require('moment'); // Usado para manipular datas

// Criar um token de recuperação de senha
async function criarToken(req, res) {
    const { email } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const token = crypto.randomBytes(20).toString('hex'); // Gera um token aleatório
        const expiracao = moment().add(1, 'hour').toDate(); // O token expira em 1 hora

        const recuperacao = await RecuperacaoSenha.create({
            id_usuario: usuario.id_usuario,
            token_recuperacao: token,
            expiracao: expiracao,
            usada: false,
        });

        return res.status(200).json({ message: 'Token gerado com sucesso.', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar o token de recuperação.' });
    }
}

// Verificar se o token é válido e não expirou
async function verificarToken(req, res) {
    const { token } = req.params;

    try {
        const recuperacao = await RecuperacaoSenha.findOne({ where: { token_recuperacao: token } });

        if (!recuperacao) {
            return res.status(404).json({ message: 'Token não encontrado.' });
        }

        if (recuperacao.usada) {
            return res.status(400).json({ message: 'Token já foi utilizado.' });
        }

        if (moment().isAfter(recuperacao.expiracao)) {
            return res.status(400).json({ message: 'Token expirado.' });
        }

        return res.status(200).json({ message: 'Token válido.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao verificar o token.' });
    }
}

module.exports = { criarToken, verificarToken };