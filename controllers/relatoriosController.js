const Relatorio = require('../models/relatorios');

// Criar novo relatório
exports.createRelatorio = async(req, res) => {
    try {
        const relatorio = await Relatorio.create(req.body);
        res.status(201).json(relatorio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todos os relatórios
exports.getAllRelatorios = async(req, res) => {
    try {
        const relatorios = await Relatorio.findAll();
        res.status(200).json(relatorios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter relatório por ID
exports.getRelatorioById = async(req, res) => {
    try {
        const relatorio = await Relatorio.findByPk(req.params.id);
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar relatório
exports.updateRelatorio = async(req, res) => {
    try {
        const relatorio = await Relatorio.findByPk(req.params.id);
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }
        await relatorio.update(req.body);
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Excluir relatório
exports.deleteRelatorio = async(req, res) => {
    try {
        const relatorio = await Relatorio.findByPk(req.params.id);
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }
        await relatorio.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};