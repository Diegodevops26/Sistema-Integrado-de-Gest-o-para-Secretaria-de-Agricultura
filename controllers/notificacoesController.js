const Notificacao = require('../models/notificacoes');

// Criar nova notificação
exports.createNotificacao = async(req, res) => {
    try {
        const notificacao = await Notificacao.create(req.body);
        res.status(201).json(notificacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas as notificações
exports.getAllNotificacoes = async(req, res) => {
    try {
        const notificacoes = await Notificacao.findAll();
        res.status(200).json(notificacoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter notificação por ID
exports.getNotificacaoById = async(req, res) => {
    try {
        const notificacao = await Notificacao.findByPk(req.params.id);
        if (!notificacao) {
            return res.status(404).json({ error: 'Notificação não encontrada' });
        }
        res.status(200).json(notificacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar notificação
exports.updateNotificacao = async(req, res) => {
    try {
        const notificacao = await Notificacao.findByPk(req.params.id);
        if (!notificacao) {
            return res.status(404).json({ error: 'Notificação não encontrada' });
        }
        await notificacao.update(req.body);
        res.status(200).json(notificacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Excluir notificação
exports.deleteNotificacao = async(req, res) => {
    try {
        const notificacao = await Notificacao.findByPk(req.params.id);
        if (!notificacao) {
            return res.status(404).json({ error: 'Notificação não encontrada' });
        }
        await notificacao.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};