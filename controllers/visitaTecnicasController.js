const VisitaTecnica = require('../models/visitatecnica');

// Criar nova visita técnica
exports.createVisitaTecnica = async(req, res) => {
    try {
        const visitaTecnica = await VisitaTecnica.create(req.body);
        res.status(201).json(visitaTecnica);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas as visitas técnicas
exports.getAllVisitasTecnicas = async(req, res) => {
    try {
        const visitasTecnicas = await VisitaTecnica.findAll({
            include: ['Agricultor', 'Tecnico'],
        });
        res.status(200).json(visitasTecnicas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter visita técnica por ID
exports.getVisitaTecnicaById = async(req, res) => {
    try {
        const visitaTecnica = await VisitaTecnica.findByPk(req.params.id, {
            include: ['Agricultor', 'Tecnico'],
        });
        if (!visitaTecnica) {
            return res.status(404).json({ error: 'Visita Técnica não encontrada' });
        }
        res.status(200).json(visitaTecnica);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar visita técnica
exports.updateVisitaTecnica = async(req, res) => {
    try {
        const visitaTecnica = await VisitaTecnica.findByPk(req.params.id);
        if (!visitaTecnica) {
            return res.status(404).json({ error: 'Visita Técnica não encontrada' });
        }
        await visitaTecnica.update(req.body);
        res.status(200).json(visitaTecnica);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Excluir visita técnica
exports.deleteVisitaTecnica = async(req, res) => {
    try {
        const visitaTecnica = await VisitaTecnica.findByPk(req.params.id);
        if (!visitaTecnica) {
            return res.status(404).json({ error: 'Visita Técnica não encontrada' });
        }
        await visitaTecnica.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};