const Tecnico = require('../models/tecnicos');

// Criar novo técnico
exports.createTecnico = async(req, res) => {
    try {
        const tecnico = await Tecnico.create(req.body);
        res.status(201).json(tecnico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todos os técnicos
exports.getAllTecnicos = async(req, res) => {
    try {
        const tecnicos = await Tecnico.findAll();
        res.status(200).json(tecnicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter técnico por ID
exports.getTecnicoById = async(req, res) => {
    try {
        const tecnico = await Tecnico.findByPk(req.params.id);
        if (!tecnico) {
            return res.status(404).json({ error: 'Técnico não encontrado' });
        }
        res.status(200).json(tecnico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar técnico
exports.updateTecnico = async(req, res) => {
    try {
        const tecnico = await Tecnico.findByPk(req.params.id);
        if (!tecnico) {
            return res.status(404).json({ error: 'Técnico não encontrado' });
        }
        await tecnico.update(req.body);
        res.status(200).json(tecnico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Excluir técnico
exports.deleteTecnico = async(req, res) => {
    try {
        const tecnico = await Tecnico.findByPk(req.params.id);
        if (!tecnico) {
            return res.status(404).json({ error: 'Técnico não encontrado' });
        }
        await tecnico.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};